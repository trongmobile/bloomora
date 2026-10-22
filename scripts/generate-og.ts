/**
 * Generates the social-share images and icons from the same data the site uses.
 *
 *   public/og-image.png            1200×630 default share image
 *   public/og/flowers/{id}.png     1200×630 one per species
 *   public/apple-touch-icon.png    180×180
 *
 * Everything is drawn from our own SVG illustrations and the self-hosted
 * Be Vietnam Pro / Newsreader fonts (text is converted to outlines with
 * opentype.js, so rendering does not depend on system fonts). No photos.
 * Run with `npm run og`; it also runs automatically before `npm run build`.
 */
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype, { type Font, type Path } from 'opentype.js';
import sharp from 'sharp';
import { FLOWERS, getFlower } from '../src/data';
import type { FlowerData } from '../src/data/types';
import { renderFlowerInner } from '../src/lib/art';
import { bioStateAt } from '../src/lib/timelapse/keyframes';
import { posterProgress } from '../src/lib/timelapse/poster';
import { buildTimeline } from '../src/lib/timelapse/timeline';
import { OG_HEIGHT, OG_WIDTH, SITE_NAME } from '../src/config/site';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FONT_DIR = join(ROOT, 'assets', 'og-fonts');
const PUBLIC = join(ROOT, 'public');

const INK = '#23202a';
const MUTED = '#5b5563';
const ACCENT = '#a3254f';

// ---------------------------------------------------------------- fonts

type Face = 'sans400' | 'sans600' | 'serif500' | 'serif500i';
const FILES: Record<Face, string[]> = {
  sans400: ['be-vietnam-pro-latin-400-normal', 'be-vietnam-pro-latin-ext-400-normal', 'be-vietnam-pro-vietnamese-400-normal'],
  sans600: ['be-vietnam-pro-latin-600-normal', 'be-vietnam-pro-latin-ext-600-normal', 'be-vietnam-pro-vietnamese-600-normal'],
  serif500: ['newsreader-latin-500-normal', 'newsreader-latin-ext-500-normal', 'newsreader-vietnamese-500-normal'],
  serif500i: ['newsreader-latin-500-italic', 'newsreader-latin-ext-500-italic', 'newsreader-vietnamese-500-italic'],
};

const cache = new Map<Face, Font[]>();
function fontsFor(face: Face): Font[] {
  let fonts = cache.get(face);
  if (!fonts) {
    fonts = FILES[face].map((name) => {
      const buf = readFileSync(join(FONT_DIR, `${name}.woff`));
      return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
    });
    cache.set(face, fonts);
  }
  return fonts;
}

/** The first subset font that really has a glyph for the character (glyph 0 is .notdef). */
function pick(fonts: Font[], ch: string): Font {
  for (const f of fonts) {
    if (f.charToGlyphIndex(ch) > 0) return f;
  }
  return fonts[0]!;
}

function measure(text: string, face: Face, size: number): number {
  const fonts = fontsFor(face);
  let w = 0;
  for (const ch of text.normalize('NFC')) {
    const f = pick(fonts, ch);
    w += f.getAdvanceWidth(ch, size);
  }
  return w;
}

/** Serialises a glyph outline with fixed two-decimal numbers separated by spaces (parsers differ on "263" vs "263.00" and on "-" separators). */
function pathData(path: Path): string {
  const n = (v: number): string => v.toFixed(2);
  let d = '';
  for (const c of path.commands) {
    if (c.type === 'M' || c.type === 'L') d += `${c.type}${n(c.x)} ${n(c.y)} `;
    else if (c.type === 'Q') d += `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)} `;
    else if (c.type === 'C') d += `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)} `;
    else d += 'Z ';
  }
  return d;
}

/** Text as one SVG <path>, drawn character by character with per-character font fallback. */
function textPath(text: string, face: Face, size: number, x: number, y: number, fill: string, opts: { anchor?: 'start' | 'middle' } = {}): string {
  const fonts = fontsFor(face);
  const total = measure(text, face, size);
  let cx = opts.anchor === 'middle' ? x - total / 2 : x;
  let d = '';
  for (const ch of text.normalize('NFC')) {
    const f = pick(fonts, ch);
    d += pathData(f.getPath(ch, cx, y, size));
    cx += f.getAdvanceWidth(ch, size);
  }
  return d ? `<path d="${d}" fill="${fill}"/>` : '';
}

function wrap(text: string, face: Face, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (line && measure(next, face, size) > maxWidth) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ---------------------------------------------------------------- pieces

function mix(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

function posterInner(flower: FlowerData, idPrefix: string): string {
  const timeline = buildTimeline(flower.stages);
  return renderFlowerInner(flower.visual, bioStateAt(timeline, posterProgress(timeline)), { idPrefix });
}

/** A rounded card holding the flower illustration. */
function artCard(flower: FlowerData, x: number, y: number, w: number, id: string, rot = 0): string {
  const h = Math.round((w * 3) / 4);
  const r = Math.round(w * 0.06);
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    `<g transform="rotate(${rot} ${cx} ${cy})">` +
    `<rect x="${x + 6}" y="${y + 12}" width="${w}" height="${h}" rx="${r}" fill="#2a1f2e" opacity=".14" filter="url(#soft)"/>` +
    `<clipPath id="clip-${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath>` +
    `<g clip-path="url(#clip-${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f7f4ee"/>` +
    `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 800 600">${posterInner(flower, `og-${id}`)}</svg></g>` +
    `<rect x="${x + 1}" y="${y + 1}" width="${w - 2}" height="${h - 2}" rx="${r}" fill="none" stroke="#ffffff" stroke-opacity=".85" stroke-width="2"/>` +
    `</g>`
  );
}

function logoMark(x: number, y: number, size: number): string {
  // Five petals around a centre, drawn with circles so it reads at favicon size.
  const r = size / 2;
  const petals = [0, 72, 144, 216, 288]
    .map((deg) => {
      const rad = ((deg - 90) * Math.PI) / 180;
      return `<circle cx="${(x + r + Math.cos(rad) * r * 0.46).toFixed(2)}" cy="${(y + r + Math.sin(rad) * r * 0.46).toFixed(2)}" r="${(r * 0.36).toFixed(2)}" fill="${ACCENT}" opacity=".88"/>`;
    })
    .join('');
  return `${petals}<circle cx="${x + r}" cy="${y + r}" r="${(r * 0.22).toFixed(2)}" fill="#f4c542"/>`;
}

const DEFS = `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfdf9"/><stop offset="1" stop-color="#f3e7ee"/></linearGradient>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
</defs>`;

function frame(inner: string, tint: string): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">${DEFS}` +
    `<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#bg)"/>` +
    `<circle cx="1020" cy="320" r="330" fill="${tint}" filter="url(#soft)"/>` +
    inner +
    `</svg>`
  );
}

function brandRow(): string {
  return logoMark(72, 62, 44) + textPath(SITE_NAME, 'sans600', 30, 128, 95, INK);
}

function flowerSvg(flower: FlowerData): string {
  const vi = flower.text.vi;
  const en = flower.text.en;
  let left = brandRow();
  const titleSize = measure(vi.name, 'serif500', 84) > 520 ? 68 : 84;
  left += textPath(vi.name, 'serif500', titleSize, 72, 270, INK);
  left += textPath(en.name, 'sans600', 38, 74, 332, ACCENT);
  left += textPath(flower.scientificName, 'serif500i', 30, 74, 384, MUTED);
  const tag = wrap(en.tagline, 'sans400', 24, 480).slice(0, 2);
  tag.forEach((line, i) => {
    left += textPath(line, 'sans400', 24, 74, 446 + i * 34, MUTED);
  });
  left += textPath('Time-lapse minh họa · Illustrative time-lapse', 'sans400', 20, 74, 566, MUTED);
  return frame(left + artCard(flower, 640, 126, 500, flower.id), mix(flower.visual.palette.petal, 0.35));
}

function defaultSvg(): string {
  const feature = ['sunflower', 'tulip', 'cherry-blossom'].map((id) => getFlower(id)).filter((f): f is FlowerData => !!f);
  let left = brandRow();
  left += textPath('Vòng đời của hoa,', 'serif500', 66, 72, 262, INK);
  left += textPath('từ hạt đến lúc tàn', 'serif500', 66, 72, 338, INK);
  left += textPath('The life of a flower, from seed to wilt', 'sans600', 28, 74, 400, ACCENT);
  left += textPath('Time-lapse minh họa · Illustrative time-lapse', 'sans400', 22, 74, 450, MUTED);
  left += textPath('8 loài · 8 species', 'sans400', 22, 74, 484, MUTED);
  const cards =
    (feature[0] ? artCard(feature[0], 700, 70, 340, 'a', -4) : '') +
    (feature[1] ? artCard(feature[1], 820, 270, 340, 'b', 3) : '') +
    (feature[2] ? artCard(feature[2], 640, 350, 300, 'c', -2) : '');
  return frame(left + cards, mix('#e8a1b8', 0.45));
}

function iconSvg(size: number): string {
  const pad = Math.round(size * 0.18);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<rect width="${size}" height="${size}" fill="#fbfdf9"/>` +
    logoMark(pad, pad, size - pad * 2) +
    `</svg>`
  );
}

// ---------------------------------------------------------------- output

async function png(svg: string, file: string): Promise<void> {
  mkdirSync(dirname(file), { recursive: true });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file);
}

async function main(): Promise<void> {
  const started = Date.now();
  await png(defaultSvg(), join(PUBLIC, 'og-image.png'));
  for (const flower of FLOWERS) {
    await png(flowerSvg(flower), join(PUBLIC, 'og', 'flowers', `${flower.id}.png`));
  }
  await png(iconSvg(180), join(PUBLIC, 'apple-touch-icon.png'));
  console.log(`og: wrote default + ${FLOWERS.length} flower images + apple-touch-icon in ${Date.now() - started} ms`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
