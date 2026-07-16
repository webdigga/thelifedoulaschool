// Generates public/og-default.png (1200x630) from the dawn theme tokens so the
// default social image always matches the live design. Run: npm run og:generate
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const theme = readFileSync(resolve(import.meta.dirname, '../src/styles/themes/dawn.css'), 'utf8');
const token = (name) => {
  const match = theme.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`Token ${name} not found in dawn theme`);
  return match[1];
};

const surface = token('--color-surface');
const ink = token('--color-ink');
const brand = token('--color-brand');
const glow = token('--color-glow');
const muted = token('--color-ink-muted');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${surface}"/>
  <!-- light rays rising from the horizon point -->
  <g stroke="${glow}" stroke-width="2" opacity="0.5">
    <line x1="600" y1="470" x2="600" y2="180"/>
    <line x1="600" y1="470" x2="430" y2="205"/>
    <line x1="600" y1="470" x2="770" y2="205"/>
    <line x1="600" y1="470" x2="290" y2="270"/>
    <line x1="600" y1="470" x2="910" y2="270"/>
    <line x1="600" y1="470" x2="190" y2="370"/>
    <line x1="600" y1="470" x2="1010" y2="370"/>
  </g>
  <!-- the bridge arc -->
  <path d="M 60 560 Q 600 330 1140 560" fill="none" stroke="${brand}" stroke-width="7"/>
  <path d="M 120 588 Q 600 380 1080 588" fill="none" stroke="${glow}" stroke-width="3" opacity="0.8"/>
  <!-- horizon -->
  <line x1="0" y1="470" x2="1200" y2="470" stroke="${muted}" stroke-width="1.5" opacity="0.55"/>
  <text x="600" y="248" text-anchor="middle" font-family="Marcellus, Georgia, serif"
    font-size="64" fill="${ink}">Bridging Heaven and Earth</text>
  <text x="600" y="316" text-anchor="middle" font-family="Georgia, serif"
    font-size="30" fill="${muted}">The Life Doula School</text>
</svg>`;

const marcellus = resolve(
  import.meta.dirname,
  '../node_modules/@fontsource/marcellus/files/marcellus-latin-400-normal.woff2',
);

const png = await sharp(Buffer.from(svg), { density: 150 })
  .resize(1200, 630)
  .png()
  .toBuffer()
  .catch((error) => {
    console.error('SVG rasterisation failed', error);
    process.exit(1);
  });

writeFileSync(resolve(import.meta.dirname, '../public/og-default.png'), png);
console.log(`Wrote public/og-default.png (fonts note: system serif fallback is used unless
librsvg can load Marcellus from ${marcellus}).`);
