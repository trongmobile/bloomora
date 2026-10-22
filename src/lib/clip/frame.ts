/**
 * Layout of the vertical 9:16 "story" frame used for shareable clips, still cards and quiz
 * results. It is pure geometry: a frame is plain data (rectangles, text items, one illustration),
 * and two thin renderers turn it into pixels:
 *  - the browser draws it on a <canvas> (`browser.ts`, uses the site's web fonts)
 *  - Node draws it as an SVG with text converted to outlines (`svg.ts`, used by scripts/render-clips.ts)
 * Text measuring is injected so the same layout fits the text in both places.
 */
import { SITE_NAME } from '../../config/site';

export const STORY_W = 1080;
export const STORY_H = 1920;

/** The part of the 800×600 illustration shown in the square card: the plant, minus empty sides. */
export const ART_CROP = { x: 100, y: 0, w: 600, h: 600 } as const;

export const STORY_COLORS = {
  ink: '#23202a',
  muted: '#5b5563',
  accent: '#a3254f',
  bgTop: '#fbfdf9',
  bgBottom: '#f3e7ee',
  stageTop: '#eaf6ff',
  stageBottom: '#f7f1e1',
  white: '#ffffff',
  track: '#e2dce3',
  tick: '#9a93a1',
  logoPetal: '#a3254f',
  logoCenter: '#f4c542',
} as const;

/** The four faces the frame uses. The renderers map them to real fonts. */
export type FontFace = 'serif' | 'serifItalic' | 'sans' | 'sansBold';
export type Measure = (text: string, face: FontFace, size: number) => number;

export interface TextItem {
  text: string;
  face: FontFace;
  size: number;
  /** Anchor x: the left edge for `left`, the centre for `center`. */
  x: number;
  /** Baseline y. */
  y: number;
  color: string;
  align: 'left' | 'center';
}

export interface StoryInput {
  /** Small accent line above the title (optional). */
  kicker?: string;
  title: string;
  subtitle?: string;
  /** Inner markup of the 800×600 illustration (from `renderFlowerInner`). */
  art: { inner: string };
  /** Serif line(s) under the card. */
  headline: string;
  /** Smaller grey line(s) under the headline. */
  detail?: string;
  /** Growth bar: `value` 0..1 plus the stage boundaries drawn as ticks. */
  progress?: { value: number; ticks: number[] };
  disclaimer: string;
  /** Short address printed as the watermark, without protocol, e.g. "bloomora.example/vi/flowers/hoa-sen". */
  watermark: string;
  /** Flower colour, tints the glow behind the card. */
  tint: string;
}

export interface StoryFrame {
  width: number;
  height: number;
  glow: { cx: number; cy: number; r: number; color: string };
  logo: { x: number; y: number; size: number };
  card: { x: number; y: number; w: number; h: number; r: number };
  art: { inner: string; crop: typeof ART_CROP };
  texts: TextItem[];
  bar: { x: number; y: number; w: number; h: number; value: number; ticks: number[] } | null;
  pill: { x: number; y: number; w: number; h: number; r: number };
}

/** Largest size in [min, start] at which `text` fits `maxWidth` (or `min`). */
export function fitSize(text: string, face: FontFace, start: number, min: number, maxWidth: number, measure: Measure): number {
  let size = start;
  while (size > min && measure(text, face, size) > maxWidth) size -= 2;
  return Math.max(min, size);
}

/**
 * One line of text that always fits: the largest size in [min, start] that fits, and when even
 * `min` is too wide (a very long name) the text is shortened with an ellipsis instead of spilling.
 */
export function fitLine(text: string, face: FontFace, start: number, min: number, maxWidth: number, measure: Measure): { text: string; size: number } {
  const size = fitSize(text, face, start, min, maxWidth, measure);
  if (measure(text, face, size) <= maxWidth) return { text, size };
  let cut = text.trimEnd();
  while (cut.length > 1 && measure(`${cut}…`, face, size) > maxWidth) cut = cut.slice(0, -1).trimEnd();
  return { text: `${cut}…`, size };
}

/** Greedy word wrap. When the text needs more than `maxLines`, the last line is shortened with an ellipsis. */
export function wrapText(text: string, face: FontFace, size: number, maxWidth: number, measure: Measure, maxLines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && measure(next, face, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  let last = `${kept[maxLines - 1]}…`;
  while (last.length > 2 && measure(last, face, size) > maxWidth) last = `${last.slice(0, -2).trimEnd()}…`;
  kept[maxLines - 1] = last;
  return kept;
}

const CARD = { x: 90, y: 590, w: 900, h: 900, r: 56 } as const;
const TEXT_W = 900;
const CX = STORY_W / 2;

export function buildStoryFrame(input: StoryInput, measure: Measure): StoryFrame {
  const texts: TextItem[] = [];
  const add = (item: TextItem): void => {
    texts.push(item);
  };

  // Brand row: logo mark + wordmark, centred as a group.
  const logo = 56;
  const gap = 18;
  const brandSize = 38;
  const brandW = measure(SITE_NAME, 'sansBold', brandSize);
  const rowX = Math.round(CX - (logo + gap + brandW) / 2);
  add({ text: SITE_NAME, face: 'sansBold', size: brandSize, x: rowX + logo + gap, y: 277, color: STORY_COLORS.ink, align: 'left' });

  if (input.kicker) {
    const k = fitLine(input.kicker, 'sansBold', 34, 24, TEXT_W, measure);
    add({ text: k.text, face: 'sansBold', size: k.size, x: CX, y: 372, color: STORY_COLORS.accent, align: 'center' });
  }
  const title = fitLine(input.title, 'serif', 96, 52, TEXT_W, measure);
  add({ text: title.text, face: 'serif', size: title.size, x: CX, y: 470, color: STORY_COLORS.ink, align: 'center' });
  if (input.subtitle) {
    const sub = fitLine(input.subtitle, 'serifItalic', 40, 28, TEXT_W, measure);
    add({ text: sub.text, face: 'serifItalic', size: sub.size, x: CX, y: 536, color: STORY_COLORS.muted, align: 'center' });
  }

  // Under the card: headline (serif), then detail (grey), then the growth bar if there is one.
  let y = CARD.y + CARD.h + 80;
  const headSize = 64;
  const head = wrapText(input.headline, 'serif', headSize, TEXT_W, measure, 2);
  head.forEach((line, i) => {
    add({ text: line, face: 'serif', size: headSize, x: CX, y: y + i * 76, color: STORY_COLORS.ink, align: 'center' });
  });
  y += (head.length - 1) * 76;
  if (input.detail) {
    const lines = wrapText(input.detail, 'sans', 32, TEXT_W, measure, input.progress ? 1 : 2);
    lines.forEach((line, i) => {
      add({ text: line, face: 'sans', size: 32, x: CX, y: y + 56 + i * 44, color: STORY_COLORS.muted, align: 'center' });
    });
    y += 56 + (lines.length - 1) * 44;
  }
  const bar = input.progress
    ? { x: CARD.x, y: y + 50, w: CARD.w, h: 14, value: Math.min(1, Math.max(0, input.progress.value)), ticks: input.progress.ticks }
    : null;

  add({ text: input.disclaimer, face: 'sans', size: 26, x: CX, y: 1780, color: STORY_COLORS.muted, align: 'center' });
  const mark = fitLine(input.watermark, 'sansBold', 34, 22, TEXT_W - 80, measure);
  add({ text: mark.text, face: 'sansBold', size: mark.size, x: CX, y: 1860, color: STORY_COLORS.accent, align: 'center' });
  const pillW = Math.round(measure(mark.text, 'sansBold', mark.size) + 80);

  return {
    width: STORY_W,
    height: STORY_H,
    glow: { cx: CX, cy: CARD.y + CARD.h / 2, r: 620, color: input.tint },
    logo: { x: rowX, y: 236, size: logo },
    card: { ...CARD },
    art: { inner: input.art.inner, crop: ART_CROP },
    texts,
    bar,
    pill: { x: Math.round(CX - pillW / 2), y: 1812, w: pillW, h: 70, r: 35 },
  };
}

/** Where `logoPetals` puts the five petals around the centre (shared by both renderers). */
export function logoPetals(x: number, y: number, size: number): { cx: number; cy: number; r: number }[] {
  const r = size / 2;
  return [0, 72, 144, 216, 288].map((deg) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { cx: x + r + Math.cos(rad) * r * 0.46, cy: y + r + Math.sin(rad) * r * 0.46, r: r * 0.36 };
  });
}

/**
 * Clip timing. The recording holds the seed for a moment and the last frame a bit longer,
 * so a loop restarts cleanly and the final bloom can be read.
 */
export function clipProgress(tSec: number, durationSec: number, holdStart = 0.5, holdEnd = 1.5): number {
  const run = Math.max(0.1, durationSec - holdStart - holdEnd);
  const p = (tSec - holdStart) / run;
  return p <= 0 ? 0 : p >= 1 ? 1 : p;
}
