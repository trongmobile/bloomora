/**
 * Text as vector outlines, shared by the OG image generator and the clip renderer.
 * Glyphs come from the self-hosted Be Vietnam Pro / Newsreader fonts in assets/og-fonts (parsed
 * with opentype.js), so Vietnamese diacritics render the same on any machine and nothing depends on
 * system fonts.
 */
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype, { type Font, type Path } from 'opentype.js';
import type { FontFace, Measure, TextItem } from '../../src/lib/clip/frame';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const FONT_DIR = join(ROOT, 'assets', 'og-fonts');

export type Face = 'sans400' | 'sans600' | 'serif500' | 'serif500i';
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

export function measure(text: string, face: Face, size: number): number {
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
export function textPath(text: string, face: Face, size: number, x: number, y: number, fill: string, opts: { anchor?: 'start' | 'middle' } = {}): string {
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

export function wrap(text: string, face: Face, size: number, maxWidth: number): string[] {
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

// ---------------------------------------------------------------- story frames

const STORY_FACE: Record<FontFace, Face> = { serif: 'serif500', serifItalic: 'serif500i', sans: 'sans400', sansBold: 'sans600' };

/** Text measurer for the 9:16 story layout (src/lib/clip/frame.ts). */
export const storyMeasure: Measure = (text, face, size) => measure(text, STORY_FACE[face], size);

const pathCache = new Map<string, string>();
/** One story text item as an outlined <path>. Cached: a clip repeats the same few strings in every frame. */
export function storyText(item: TextItem): string {
  const key = `${item.face}|${item.size}|${item.x}|${item.y}|${item.color}|${item.align}|${item.text}`;
  let svg = pathCache.get(key);
  if (svg === undefined) {
    svg = textPath(item.text, STORY_FACE[item.face], item.size, item.x, item.y, item.color, { anchor: item.align === 'center' ? 'middle' : 'start' });
    pathCache.set(key, svg);
  }
  return svg;
}
