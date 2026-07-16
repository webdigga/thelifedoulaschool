// Generates the default social image (public/og-default.png, 1200x630) and
// the apple-touch-icon (180x180) from the site identity: the Life Doula
// Wheel mark plus the dawn-theme tokens. Run: npm run og:generate
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
const muted = token('--color-ink-muted');

// Ring colours are the client's wheel specification (src/content/book-wheel.json).
const rings = JSON.parse(
  readFileSync(resolve(import.meta.dirname, '../src/content/book-wheel.json'), 'utf8'),
).sort((a, b) => b.ring - a.ring);

const wheel = (cx, cy, outerRadius) =>
  rings
    .map(
      (ring, index) =>
        `<circle cx="${cx}" cy="${cy}" r="${outerRadius - index * (outerRadius / 7)}" fill="${ring.colour}"/>`,
    )
    .join('\n  ');

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${surface}"/>
  ${wheel(600, 200, 90)}
  <text x="600" y="388" text-anchor="middle" font-family="Marcellus, Georgia, serif"
    font-size="60" fill="${ink}">Bridging Heaven and Earth</text>
  <text x="600" y="452" text-anchor="middle" font-family="Georgia, serif"
    font-size="30" fill="${muted}">The Life Doula School</text>
</svg>`;

const og = await sharp(Buffer.from(ogSvg), { density: 150 }).resize(1200, 630).png().toBuffer();
writeFileSync(resolve(import.meta.dirname, '../public/og-default.png'), og);

const iconSvg = `
<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="${surface}"/>
  ${wheel(90, 90, 78)}
</svg>`;

const icon = await sharp(Buffer.from(iconSvg)).png().toBuffer();
writeFileSync(resolve(import.meta.dirname, '../public/apple-touch-icon.png'), icon);

console.log('Wrote public/og-default.png and public/apple-touch-icon.png');
