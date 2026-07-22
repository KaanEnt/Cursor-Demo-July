// Always-on deploy watcher: streams Vercel build logs and auto-opens newly deployed pages.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFile, execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { projectId, orgId } = JSON.parse(
  readFileSync(join(projectDir, '.vercel', 'project.json'), 'utf8'),
);

const SITE_ORIGIN = process.env.SITE_ORIGIN ?? 'https://powersell-site.vercel.app';
const POLL_MS = Number(process.env.POLL_MS ?? 20_000);
const BUILD_POLL_MS = Number(process.env.BUILD_POLL_MS ?? 5_000);
const STATE_PATH = join(projectDir, 'scripts', '.listener-state.json');
const AUTH_PATH = join(homedir(), 'Library', 'Application Support', 'com.vercel.cli', 'auth.json');
const REPLAY_LAST = process.argv.includes('--replay-last');

const tty = process.stdout.isTTY;
const paint = (code, s) => (tty ? `\x1b[${code}m${s}\x1b[0m` : s);
const dim = (s) => paint('2', s);
const cyan = (s) => paint('36', s);
const green = (s) => paint('32', s);
const red = (s) => paint('31', s);
const magenta = (s) => paint('35', s);
const yellow = (s) => paint('33', s);

function log(line) {
  console.log(`${dim(new Date().toTimeString().slice(0, 8))}  ${line}`);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let state = null;
let token = process.env.VERCEL_TOKEN ?? null;
let manifestOnly = false;
let warnedNoManifest = false;

function saveState() {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_PATH, 'utf8'));
  } catch {
    return null;
  }
}

// The CLI rotates its own token; a cheap `vercel whoami` forces a refresh.
function readCliToken({ refresh = false } = {}) {
  if (refresh) {
    try {
      execFileSync('vercel', ['whoami'], { stdio: 'ignore' });
    } catch {
      /* offline or logged out; auth.json read below decides */
    }
  }
  try {
    const auth = JSON.parse(readFileSync(AUTH_PATH, 'utf8'));
    if (!refresh && auth.expiresAt && auth.expiresAt * 1000 < Date.now() + 60_000) {
      return readCliToken({ refresh: true });
    }
    return auth.token ?? null;
  } catch {
    return null;
  }
}

function enterManifestOnly(reason) {
  if (manifestOnly) return;
  manifestOnly = true;
  log(yellow(`⚠ ${reason} — deployment logs disabled, still watching for new pages`));
}

async function api(path, params = {}) {
  if (manifestOnly) return null;
  token ??= readCliToken();
  if (!token) {
    enterManifestOnly('no Vercel token (run `vercel login`)');
    return null;
  }
  const url = new URL(`https://api.vercel.com${path}`);
  url.searchParams.set('teamId', orgId);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  for (let attempt = 0; attempt < 3; attempt++) {
    let res;
    try {
      res = await fetch(url, { headers: { authorization: `Bearer ${token}` } });
    } catch {
      return null; // transient network error; next poll retries
    }
    if (res.status === 401 || res.status === 403) {
      if (attempt === 0) {
        token = readCliToken({ refresh: true });
        if (token) continue;
      }
      enterManifestOnly('Vercel API auth failed after token refresh');
      return null;
    }
    if (res.status === 429) {
      const wait = Number(res.headers.get('retry-after') ?? 10) * 1000;
      log(yellow(`rate limited, waiting ${Math.round(wait / 1000)}s`));
      await sleep(wait);
      continue;
    }
    if (!res.ok) return null;
    return res.json();
  }
  return null;
}

const depId = (d) => d.uid ?? d.id;
const depState = (d) => d.readyState ?? d.state ?? 'UNKNOWN';

async function listDeployments(limit = 5) {
  const data = await api('/v7/deployments', { projectId, limit, target: 'production' });
  return data?.deployments ?? [];
}

const getDeployment = (uid) => api(`/v13/deployments/${uid}`);

async function getEvents(uid, since) {
  const events = await api(`/v3/deployments/${uid}/events`, {
    builds: 1,
    direction: 'forward',
    limit: -1,
    ...(since ? { since } : {}),
  });
  return Array.isArray(events) ? events : [];
}

const seenEventIds = new Set();
let lastEventDate = 0;

function printEvents(events) {
  for (const ev of events) {
    if (!['stdout', 'stderr', 'command', 'exit'].includes(ev.type)) continue;
    const id = ev.id ?? ev.payload?.id;
    if (id) {
      if (seenEventIds.has(id)) continue;
      seenEventIds.add(id);
    }
    lastEventDate = Math.max(lastEventDate, ev.date ?? ev.payload?.date ?? ev.created ?? 0);
    for (const line of String(ev.text ?? ev.payload?.text ?? '').replace(/\n$/, '').split('\n')) {
      log(dim('│ ') + line);
    }
  }
}

async function fetchManifest() {
  try {
    const res = await fetch(`${SITE_ORIGIN}/manifest.json?t=${Date.now()}`, {
      headers: { 'cache-control': 'no-cache' },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function checkManifest({ announceUnchanged = false } = {}) {
  const manifest = await fetchManifest();
  if (!manifest) {
    if (!warnedNoManifest) {
      warnedNoManifest = true;
      log(yellow('manifest.json not on the site yet — deploy a build that emits it'));
    }
    return false;
  }
  const mark = `${manifest.commit}:${manifest.generatedAt}`;
  const changed = mark !== state.manifestMark;
  const pages = manifest.pages ?? [];
  const fresh = pages.filter((p) => !state.knownPages.includes(p.path));
  for (const page of fresh) {
    log(`${magenta('▲ NEW PAGE')} ${page.path}${page.title ? dim(`  (${page.title})`) : ''} → opening in browser`);
    execFile('/usr/bin/open', [SITE_ORIGIN + page.path]);
  }
  if (!fresh.length && changed && announceUnchanged) {
    log(dim(`site updated (${manifest.commit}) — no new pages`));
  }
  state.knownPages = pages.map((p) => p.path);
  state.manifestMark = mark;
  saveState();
  return changed;
}

// After promotion, poll fast until the fresh manifest is actually served.
async function eagerManifestCheck() {
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    if (await checkManifest({ announceUnchanged: true })) return;
    await sleep(3_000);
  }
  log(dim('manifest unchanged after 90s (deploy may not have touched pages)'));
}

function announce(dep) {
  log(`${cyan('● NEW DEPLOYMENT')} ${depId(dep).slice(0, 20)}…  ${depState(dep)}`);
  if (!state.announced.includes(depId(dep))) state.announced.push(depId(dep));
  state.announced = state.announced.slice(-20);
  state.lastDeploymentCreatedAt = Math.max(state.lastDeploymentCreatedAt, dep.createdAt ?? 0);
  saveState();
}

async function watchDeployment(dep) {
  let uid = depId(dep);
  let since = dep.createdAt ?? Date.now() - 60_000;
  let waitingForAlias = false;
  seenEventIds.clear();
  lastEventDate = 0;

  while (!manifestOnly) {
    printEvents(await getEvents(uid, since));
    if (lastEventDate) since = lastEventDate + 1;

    const detail = await getDeployment(uid);
    const rs = detail?.readyState;
    if (rs === 'ERROR' || rs === 'CANCELED') {
      log(`${red(`✗ ${rs}`)}${detail?.errorMessage ? `  ${detail.errorMessage}` : ''}`);
      return;
    }
    if (rs === 'READY') {
      if (detail.aliasAssigned) {
        log(`${green('✓ READY (live)')}  ${SITE_ORIGIN.replace(/^https?:\/\//, '')}`);
        await eagerManifestCheck();
        return;
      }
      if (!waitingForAlias) {
        waitingForAlias = true;
        log(dim('build done, waiting for domain promotion…'));
      }
    }

    // Rapid re-pushes: hand the stream to the newest deployment instead of interleaving.
    const [latest] = await listDeployments(1);
    if (latest && depId(latest) !== uid && (latest.createdAt ?? 0) > (dep.createdAt ?? 0)) {
      log(dim('──────── newer deployment detected, switching stream ────────'));
      dep = latest;
      uid = depId(latest);
      since = latest.createdAt;
      waitingForAlias = false;
      seenEventIds.clear();
      lastEventDate = 0;
      announce(latest);
    }
    await sleep(BUILD_POLL_MS);
  }
}

// Dress rehearsal: replay the last completed deployment's logs with zero deploys.
async function replayLast() {
  const deps = await listDeployments(5);
  const done = deps.find((d) => depState(d) === 'READY');
  if (!done) {
    log(yellow('no completed deployment to replay'));
    return;
  }
  log(dim('── replaying last completed deployment ──'));
  announce(done);
  seenEventIds.clear();
  printEvents(await getEvents(depId(done)));
  log(`${green('✓ READY (live)')}  ${SITE_ORIGIN.replace(/^https?:\/\//, '')}`);
  log(dim('── replay done, resuming normal watch ──'));
}

async function seedBaseline() {
  state = {
    knownPages: [],
    manifestMark: null,
    lastDeploymentCreatedAt: 0,
    announced: [],
  };
  const manifest = await fetchManifest();
  if (manifest) {
    state.knownPages = (manifest.pages ?? []).map((p) => p.path);
    state.manifestMark = `${manifest.commit}:${manifest.generatedAt}`;
  }
  const [latest] = await listDeployments(1);
  if (latest) {
    // Leave in-flight builds unannounced so the first loop pass picks them up.
    if (['READY', 'ERROR', 'CANCELED'].includes(depState(latest))) {
      state.announced = [depId(latest)];
      state.lastDeploymentCreatedAt = latest.createdAt ?? 0;
    } else {
      state.lastDeploymentCreatedAt = (latest.createdAt ?? 1) - 1;
    }
  }
  saveState();
  log(`${dim('○')} baseline seeded (${state.knownPages.length} page${state.knownPages.length === 1 ? '' : 's'}${latest ? `, latest ${depId(latest).slice(0, 20)}… ${depState(latest)}` : ''})`);
}

async function main() {
  log(`watching ${cyan(SITE_ORIGIN.replace(/^https?:\/\//, ''))} ${dim(`· poll ${POLL_MS / 1000}s · build poll ${BUILD_POLL_MS / 1000}s`)}`);

  state = loadState();
  if (!state) await seedBaseline();
  if (REPLAY_LAST) await replayLast();

  while (true) {
    const deployments = await listDeployments(5);
    const fresh = deployments
      .filter((d) => (d.createdAt ?? 0) > state.lastDeploymentCreatedAt && !state.announced.includes(depId(d)))
      .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
    if (fresh.length) {
      const newest = fresh[fresh.length - 1];
      for (const d of fresh) announce(d);
      await watchDeployment(newest);
    }
    await checkManifest();
    await sleep(POLL_MS);
  }
}

process.on('SIGINT', () => {
  console.log();
  log(dim('listener stopped'));
  process.exit(0);
});

main();
