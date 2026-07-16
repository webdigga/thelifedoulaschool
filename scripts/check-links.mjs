// Internal link checker, run against dist/ after a build (npm run test:build).
// Verifies every internal href/src in the built HTML resolves to a built file,
// a public asset, or a redirect defined in public/_redirects.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve(import.meta.dirname, '../dist');
const REDIRECTS = resolve(import.meta.dirname, '../public/_redirects');

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

const redirectSources = new Set(
  readFileSync(REDIRECTS, 'utf8')
    .split('\n')
    .map((line) => line.replace(/#.*/, '').trim())
    .filter(Boolean)
    .map((line) => line.split(/\s+/)[0]),
);

function targetExists(pathname) {
  const clean = pathname.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return existsSync(join(DIST, 'index.html'));
  if (redirectSources.has(clean)) return true;
  const candidates = [
    join(DIST, clean),
    join(DIST, clean, 'index.html'),
    join(DIST, `${clean.replace(/\/$/, '')}.html`),
  ];
  return candidates.some((candidate) => existsSync(candidate));
}

const failures = [];
let checked = 0;

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  const links = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const link of links) {
    if (!link.startsWith('/') || link.startsWith('//')) continue;
    checked += 1;
    if (!targetExists(link)) {
      failures.push(`${file.replace(DIST, '')} -> ${link}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`Link check FAILED (${failures.length} broken internal links):`);
  for (const failure of [...new Set(failures)]) console.error(`  ${failure}`);
  process.exit(1);
}
console.log(`Link check passed: ${checked} internal references verified.`);
