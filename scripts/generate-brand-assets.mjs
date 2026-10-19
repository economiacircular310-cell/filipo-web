/**
 * Generates favicon, app icons, logo and Open Graph images into /public.
 * Run with: npm run assets
 */
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const out = new URL('../public/', import.meta.url);

const mark = (size, radius = 8) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
      <stop stop-color="#6366F1"/><stop offset="1" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="${radius}" fill="url(#g)"/>
  <path d="M10 8h13v4h-9v2.5h7v4h-7V24h-4z" fill="#fff"/>
  <rect x="19.5" y="20" width="4" height="4" rx="1" fill="#22D3EE"/>
</svg>`;

const og = (lines, tagline) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow1" cx="15%" cy="0%" r="60%">
      <stop stop-color="#6366F1" stop-opacity=".55"/><stop offset="1" stop-color="#6366F1" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="95%" cy="100%" r="55%">
      <stop stop-color="#8B5CF6" stop-opacity=".45"/><stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity=".05"/>
    </pattern>
    <linearGradient id="text" x1="0" x2="1">
      <stop stop-color="#ffffff"/><stop offset=".6" stop-color="#818CF8"/><stop offset="1" stop-color="#22D3EE"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0A0B10"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <g transform="translate(80 80) scale(2.25)">
    <rect width="32" height="32" rx="8" fill="#6366F1"/>
    <path d="M10 8h13v4h-9v2.5h7v4h-7V24h-4z" fill="#fff"/>
    <rect x="19.5" y="20" width="4" height="4" rx="1" fill="#22D3EE"/>
  </g>
  <text x="170" y="128" font-family="Inter, 'DejaVu Sans', Arial, sans-serif" font-size="40" font-weight="700" fill="#E6E8EF">filipo<tspan font-family="'DejaVu Sans Mono', monospace" font-weight="400" fill="#9AA0B4">/studio</tspan></text>
  ${lines
    .map(
      (l, i) =>
        `<text x="80" y="${300 + i * 76}" font-family="Inter, 'DejaVu Sans', Arial, sans-serif" font-size="60" font-weight="700" fill="${i === lines.length - 1 ? 'url(#text)' : '#FFFFFF'}">${l}</text>`,
    )
    .join('\n  ')}
  <text x="80" y="550" font-family="'DejaVu Sans Mono', monospace" font-size="26" fill="#9AA0B4">${tagline}</text>
  <text x="1120" y="550" text-anchor="end" font-family="'DejaVu Sans Mono', monospace" font-size="26" fill="#818CF8">filipostudio.com</text>
</svg>`;

/** Wrap a PNG in a single-image .ico container (PNG-in-ICO is supported by all modern browsers). */
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt8(0, 8);
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

await writeFile(new URL('favicon.svg', out), mark(32).trim());
await writeFile(new URL('favicon.ico', out), pngToIco(await png(mark(256), 32), 32));
await writeFile(new URL('apple-touch-icon.png', out), await png(mark(512, 0), 180));
await writeFile(new URL('icon-192.png', out), await png(mark(512), 192));
await writeFile(new URL('icon-512.png', out), await png(mark(512), 512));
await writeFile(new URL('logo.png', out), await png(mark(512), 512));

await writeFile(
  new URL('og-default.png', out),
  await sharp(Buffer.from(og(['Software a medida, SEO', 'y webs que la IA recomienda'], 'Custom software · SEO · Web performance')))
    .png({ compressionLevel: 9 })
    .toBuffer(),
);

console.log('Brand assets generated in /public');
