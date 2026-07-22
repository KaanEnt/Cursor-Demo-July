// Fallback page scaffolder: npm run page:new -- <slug> "Page Title"
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [slug, titleArg] = process.argv.slice(2);

if (!slug || !/^[a-z][a-z0-9-]*$/.test(slug)) {
  console.error('usage: npm run page:new -- <slug> ["Page Title"]');
  process.exit(1);
}

const title = titleArg ?? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
const htmlPath = join(projectDir, `${slug}.html`);
const tsxPath = join(projectDir, 'src', 'pages', `${slug}.tsx`);

if (existsSync(htmlPath) || existsSync(tsxPath)) {
  console.error(`page "${slug}" already exists`);
  process.exit(1);
}

// Derive from index.html so the shared head never drifts from the template.
const html = readFileSync(join(projectDir, 'index.html'), 'utf8')
  .replace(/<title>[^<]*<\/title>/, `<title>PowerSell | ${title}</title>`)
  .replace('/src/main.tsx', `/src/pages/${slug}.tsx`);

const tsx = `import { PageShell, mountPage } from './PageShell';

mountPage(
  <PageShell>
    <section className="container mx-auto max-w-6xl px-4 py-24">
      <h1 className="font-display text-4xl font-bold text-foreground">${title}</h1>
      <p className="mt-4 text-muted">Replace this with real content.</p>
    </section>
  </PageShell>,
);
`;

writeFileSync(htmlPath, html);
writeFileSync(tsxPath, tsx);
console.log(`created ${slug}.html + src/pages/${slug}.tsx → /${slug}`);
