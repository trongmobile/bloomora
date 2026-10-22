/**
 * Generates the social-share images and icons from the same data the site uses.
 *
 *   public/og-image.png            1200×630 default share image
 *   public/og/flowers/{id}.png     1200×630 one per species
 *   public/og/moments/{lang}/{id}-{stage}.png   one per species, stage and language (share landing pages)
 *   public/og/quiz/{lang}/{stage}.png           one per quiz result and language
 *   public/apple-touch-icon.png    180×180
 *
 * Everything is drawn from our own SVG illustrations and the self-hosted
 * Be Vietnam Pro / Newsreader fonts (text is converted to outlines with
 * opentype.js, so rendering does not depend on system fonts). No photos.
 * Run with `npm run og`; it also runs automatically before `npm run build`.
 */
import { mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { FLOWERS, getFlower } from '../src/data';
import { QUIZ_RESULTS } from '../src/data/quiz';
import { LANGS, STAGE_IDS, type FlowerData, type Lang, type StageId } from '../src/data/types';
import { fmt, getDict } from '../src/i18n';
import { momentBioState } from '../src/lib/moment';
import { routes } from '../src/lib/routes';
import { renderFlowerInner } from '../src/lib/art';
import { bioStateAt } from '../src/lib/timelapse/keyframes';
import { posterProgress } from '../src/lib/timelapse/poster';
import { buildTimeline } from '../src/lib/timelapse/timeline';
import { OG_HEIGHT, OG_WIDTH, SITE_NAME } from '../src/config/site';
import { measure, textPath, wrap, type Face } from './lib/text-path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');

const INK = '#23202a';
const MUTED = '#5b5563';
const ACCENT = '#a3254f';

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
function artCard(flower: FlowerData, x: number, y: number, w: number, id: string, rot = 0, inner = posterInner(flower, `og-${id}`)): string {
  const h = Math.round((w * 3) / 4);
  const r = Math.round(w * 0.06);
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    `<g transform="rotate(${rot} ${cx} ${cy})">` +
    `<rect x="${x + 6}" y="${y + 12}" width="${w}" height="${h}" rx="${r}" fill="#2a1f2e" opacity=".14" filter="url(#soft)"/>` +
    `<clipPath id="clip-${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath>` +
    `<g clip-path="url(#clip-${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f7f4ee"/>` +
    `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 800 600">${inner}</svg></g>` +
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

/** Wraps text to at most `max` lines, ending the last one with an ellipsis when something was cut. */
function clampLines(text: string, face: Face, size: number, width: number, max: number): string[] {
  const all = wrap(text, face, size, width);
  if (all.length <= max) return all;
  const kept = all.slice(0, max);
  kept[max - 1] = `${kept[max - 1]!.replace(/[\s,;:.–-]+$/, '')}…`;
  return kept;
}

const firstSentence = (text: string): string => text.split(/(?<=[.!?])\s+/)[0] ?? text;

/** The art of one stage of one species, for the cards on moment and quiz images. */
function stageInner(flower: FlowerData, stage: StageId, idPrefix: string): string {
  return renderFlowerInner(flower.visual, momentBioState(flower, stage), { idPrefix });
}

/** Share landing page of one stage: "Hoa sen · Nụ phát triển". */
function momentSvg(flower: FlowerData, stage: StageId, lang: Lang): string {
  const dict = getDict(lang);
  const text = flower.text[lang];
  const stageName = text.stages[stage]?.name ?? dict.stageNames[stage];
  const n = flower.stages.findIndex((s) => s.id === stage) + 1;
  let left = brandRow();
  const titleSize = measure(text.name, 'serif500', 84) > 520 ? 64 : 84;
  left += textPath(text.name, 'serif500', titleSize, 72, 262, INK);
  const nameSize = measure(stageName, 'sans600', 44) > 500 ? 34 : 44;
  left += textPath(stageName, 'sans600', nameSize, 74, 330, ACCENT);
  left += textPath(fmt(dict.player.stageOf, { n, total: flower.stages.length }), 'sans400', 28, 74, 380, MUTED);
  left += textPath(flower.scientificName, 'serif500i', 30, 74, 430, MUTED);
  clampLines(firstSentence(text.stages[stage]?.description ?? dict.stageBlurbs[stage]), 'sans400', 22, 480, 2).forEach((line, i) => {
    left += textPath(line, 'sans400', 22, 74, 480 + i * 32, MUTED);
  });
  left += textPath(dict.player.illustrative, 'sans400', 20, 74, 566, MUTED);
  return frame(left + artCard(flower, 640, 126, 500, `${flower.id}-${stage}`, 0, stageInner(flower, stage, `og-${flower.id}-${stage}`)), mix(flower.visual.palette.petal, 0.35));
}

/** Result of the quiz: the stage title next to its showcase flower. */
function quizSvg(stage: StageId, lang: Lang): string {
  const dict = getDict(lang);
  const result = QUIZ_RESULTS[stage].text[lang];
  const flower = getFlower(QUIZ_RESULTS[stage].showcase)!;
  const index = STAGE_IDS.indexOf(stage);
  let left = brandRow();
  left += textPath(dict.quiz.kicker, 'sans600', 24, 74, 200, ACCENT);
  const titleLines = clampLines(result.title, 'serif500', 68, 540, 2);
  titleLines.forEach((line, i) => {
    left += textPath(line, 'serif500', 68, 72, 290 + i * 78, INK);
  });
  const y = 290 + (titleLines.length - 1) * 78;
  left += textPath(fmt(dict.quiz.stageOf, { n: index + 1, total: STAGE_IDS.length }), 'sans600', 28, 74, y + 56, MUTED);
  clampLines(firstSentence(result.body), 'sans400', 24, 500, 2).forEach((line, i) => {
    left += textPath(line, 'sans400', 24, 74, y + 112 + i * 34, MUTED);
  });
  left += textPath(dict.quiz.disclaimer, 'sans400', 20, 74, 566, MUTED);
  return frame(left + artCard(flower, 640, 126, 500, `quiz-${stage}`, 0, stageInner(flower, stage, `og-quiz-${stage}`)), mix(flower.visual.palette.petal, 0.35));
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

interface Job {
  svg: () => string;
  file: string;
}

/** Runs `worker` over `items` with a few in flight at a time (sharp rasterises on libvips threads). */
async function pool<T>(items: readonly T[], size: number, worker: (item: T) => Promise<void>): Promise<void> {
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) await worker(items[next++]!);
    }),
  );
}

async function main(): Promise<void> {
  const started = Date.now();
  const jobs: Job[] = [{ svg: defaultSvg, file: join(PUBLIC, 'og-image.png') }];
  for (const flower of FLOWERS) {
    jobs.push({ svg: () => flowerSvg(flower), file: join(PUBLIC, routes.ogFlower(flower.id)) });
  }
  let moments = 0;
  for (const lang of LANGS) {
    for (const stage of STAGE_IDS) {
      jobs.push({ svg: () => quizSvg(stage, lang), file: join(PUBLIC, routes.ogQuiz(lang, stage)) });
    }
    for (const flower of FLOWERS) {
      for (const { id: stage } of flower.stages) {
        moments += 1;
        jobs.push({ svg: () => momentSvg(flower, stage, lang), file: join(PUBLIC, routes.ogMoment(lang, flower.id, stage)) });
      }
    }
  }
  await pool(jobs, 6, (job) => png(job.svg(), job.file));
  await png(iconSvg(180), join(PUBLIC, 'apple-touch-icon.png'));
  console.log(
    `og: wrote default + ${FLOWERS.length} flower + ${moments} moment + ${LANGS.length * STAGE_IDS.length} quiz images + apple-touch-icon in ${Date.now() - started} ms`,
  );
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
