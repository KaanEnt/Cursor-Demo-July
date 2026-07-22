import { execSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const root = import.meta.dirname;

// Every root-level .html file is a page; adding a page needs zero config edits.
const pageFiles = readdirSync(root).filter((f) => f.endsWith('.html'));

function routeFor(file: string): string {
  const name = file.replace(/\.html$/, '');
  return name === 'index' ? '/' : `/${name}`;
}

function titleFor(file: string): string {
  const html = readFileSync(resolve(root, file), 'utf8');
  return /<title>([^<]*)<\/title>/i.exec(html)?.[1]?.trim() ?? file;
}

function commitSha(): string {
  const vercelSha = process.env.VERCEL_GIT_COMMIT_SHA;
  if (vercelSha) return vercelSha.slice(0, 7);
  try {
    return execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();
  } catch {
    return 'dev';
  }
}

// Page inventory polled by scripts/listener.mjs to detect newly deployed pages.
function pagesManifest(): Plugin {
  return {
    name: 'pages-manifest',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: JSON.stringify(
          {
            generatedAt: new Date().toISOString(),
            commit: commitSha(),
            pages: pageFiles.map((file) => ({
              path: routeFor(file),
              title: titleFor(file),
              file,
            })),
          },
          null,
          2,
        ),
      });
    },
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), pagesManifest()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pageFiles.map((f) => [f.replace(/\.html$/, ''), resolve(root, f)]),
      ),
    },
  },
});
