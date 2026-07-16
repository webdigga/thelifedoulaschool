// WCAG 2.1 contrast audit for every token pairing the design actually uses,
// across every theme file. Fails below AA (4.5:1 text, 3:1 large text/UI).
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const THEMES_DIR = resolve(import.meta.dirname, '../src/styles/themes');

// [foreground, background, minimum ratio, usage]
const PAIRINGS = [
  ['--color-ink', '--color-surface', 4.5, 'body text on page'],
  ['--color-ink', '--color-surface-alt', 4.5, 'body text on alt bands and cards'],
  ['--color-ink-muted', '--color-surface', 4.5, 'muted text on page'],
  ['--color-ink-muted', '--color-surface-alt', 4.5, 'muted text on alt bands'],
  ['--color-brand', '--color-surface', 4.5, 'headings and links on page'],
  ['--color-brand', '--color-surface-alt', 4.5, 'headings and links on alt bands'],
  ['--color-brand-contrast', '--color-brand', 4.5, 'text on brand (buttons, footer)'],
  ['--color-accent', '--color-surface', 4.5, 'accent text on page'],
  ['--color-line', '--color-surface', 1.2, 'hairline borders (decorative)'],
];

function parseTokens(css) {
  const tokens = {};
  for (const match of css.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})/g)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}

function luminance(hex) {
  const channels = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function ratio(hexA, hexB) {
  const [light, dark] = [luminance(hexA), luminance(hexB)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

let failed = false;
for (const file of readdirSync(THEMES_DIR).filter((name) => name.endsWith('.css'))) {
  const tokens = parseTokens(readFileSync(join(THEMES_DIR, file), 'utf8'));
  console.log(`\nTheme: ${file}`);
  for (const [fg, bg, minimum, usage] of PAIRINGS) {
    if (!tokens[fg] || !tokens[bg]) {
      console.error(`  MISSING token ${!tokens[fg] ? fg : bg}`);
      failed = true;
      continue;
    }
    const value = ratio(tokens[fg], tokens[bg]);
    const ok = value >= minimum;
    if (!ok) failed = true;
    console.log(
      `  ${ok ? 'PASS' : 'FAIL'} ${value.toFixed(2)}:1 (min ${minimum}) ${fg} on ${bg} (${usage})`,
    );
  }
}

process.exit(failed ? 1 : 0);
