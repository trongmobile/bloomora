/**
 * Renders a StoryFrame as one SVG document. The caller supplies the text, because Node has no
 * system fonts to rely on: scripts/render-clips.ts converts each text item to outlines.
 */
import { STORY_COLORS, logoPetals, type StoryFrame, type TextItem } from './frame';

export type TextRenderer = (item: TextItem) => string;

const n = (v: number): string => String(Math.round(v * 10) / 10);

export function storyToSvg(frame: StoryFrame, drawText: TextRenderer): string {
  const { width: W, height: H, card, glow, art, bar, pill, logo } = frame;
  const c = STORY_COLORS;
  const petals = logoPetals(logo.x, logo.y, logo.size)
    .map((p) => `<circle cx="${n(p.cx)}" cy="${n(p.cy)}" r="${n(p.r)}" fill="${c.logoPetal}" opacity=".88"/>`)
    .join('');
  const { crop } = art;
  const ticks = bar
    ? bar.ticks.map((t) => `<rect x="${n(bar.x + bar.w * t - 1.5)}" y="${n(bar.y - 6)}" width="3" height="${n(bar.h + 12)}" rx="1.5" fill="${c.tick}" opacity=".7"/>`).join('')
    : '';
  const barSvg = bar
    ? `<rect x="${bar.x}" y="${bar.y}" width="${bar.w}" height="${bar.h}" rx="${bar.h / 2}" fill="${c.track}"/>` +
      `<rect x="${bar.x}" y="${bar.y}" width="${n(Math.max(bar.h, bar.w * bar.value))}" height="${bar.h}" rx="${bar.h / 2}" fill="url(#fill)"/>` +
      ticks
    : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<defs>` +
    `<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.bgTop}"/><stop offset="1" stop-color="${c.bgBottom}"/></linearGradient>` +
    `<radialGradient id="glow"><stop offset="0" stop-color="${glow.color}" stop-opacity=".5"/><stop offset="1" stop-color="${glow.color}" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="stage" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.stageTop}"/><stop offset="1" stop-color="${c.stageBottom}"/></linearGradient>` +
    `<linearGradient id="fill" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#23694a"/><stop offset="1" stop-color="${c.accent}"/></linearGradient>` +
    `<clipPath id="card"><rect x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" rx="${card.r}"/></clipPath>` +
    `<filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter>` +
    `</defs>` +
    `<rect width="${W}" height="${H}" fill="url(#bg)"/>` +
    `<circle cx="${glow.cx}" cy="${glow.cy}" r="${glow.r}" fill="url(#glow)"/>` +
    petals +
    `<circle cx="${n(logo.x + logo.size / 2)}" cy="${n(logo.y + logo.size / 2)}" r="${n(logo.size * 0.11)}" fill="${c.logoCenter}"/>` +
    `<rect x="${card.x + 8}" y="${card.y + 18}" width="${card.w}" height="${card.h}" rx="${card.r}" fill="#2a1f2e" opacity=".16" filter="url(#soft)"/>` +
    `<g clip-path="url(#card)"><rect x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" fill="url(#stage)"/>` +
    `<svg x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" viewBox="${crop.x} ${crop.y} ${crop.w} ${crop.h}">${art.inner}</svg></g>` +
    `<rect x="${card.x + 1.5}" y="${card.y + 1.5}" width="${card.w - 3}" height="${card.h - 3}" rx="${card.r}" fill="none" stroke="${c.white}" stroke-opacity=".9" stroke-width="3"/>` +
    barSvg +
    `<rect x="${pill.x}" y="${pill.y}" width="${pill.w}" height="${pill.h}" rx="${pill.r}" fill="${c.white}" opacity=".78"/>` +
    frame.texts.map(drawText).join('') +
    `</svg>`
  );
}
