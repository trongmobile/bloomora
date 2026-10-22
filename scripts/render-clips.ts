/**
 * Renders the vertical 9:16 share clips (MP4, 1080×1920) and still cards (PNG) for TikTok,
 * Reels, Shorts and Pinterest, straight from the site's own illustrations. No photos, no network.
 *
 *   npm run clips                                  # every species, Vietnamese, 14 s @ 30 fps
 *   npm run clips -- --lang vi,en --only sunflower,lotus
 *   npm run clips -- --stills-only                 # PNG cards only (seconds, needs no ffmpeg)
 *   npm run clips -- --site https://hoa.example.com --base /
 *
 * Output goes to out/clips/<lang>/<id>.mp4, <id>.png and captions.txt.
 * Needs ffmpeg on the PATH for the videos. The frame layout is the same code the in-page
 * "Make vertical clip" button uses (src/lib/clip), so both look the same.
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { FLOWERS } from '../src/data';
import { LANGS, type FlowerData, type Lang } from '../src/data/types';
import { getDict } from '../src/i18n';
import { buildStoryFrame, clipProgress } from '../src/lib/clip/frame';
import { brandAddress, createMomentStory, type MomentStory } from '../src/lib/clip/story';
import { storyToSvg } from '../src/lib/clip/svg';
import { routes } from '../src/lib/routes';
import { absoluteUrl, normalizeBase, normalizeSite } from '../src/lib/url';
import { storyMeasure, storyText } from './lib/text-path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const flag = (name: string): boolean => process.argv.includes(`--${name}`);

const seconds = Number(arg('seconds') ?? 14);
const fps = Number(arg('fps') ?? 30);
const site = normalizeSite(arg('site') ?? process.env.SITE_URL);
const base = normalizeBase(arg('base') ?? process.env.BASE_PATH);
const out = resolve(ROOT, arg('out') ?? 'out/clips');
const stillsOnly = flag('stills-only');
const langs = (arg('lang') ?? 'vi').split(',').map((l) => l.trim()) as Lang[];
const only = arg('only')?.split(',').map((s) => s.trim());

for (const l of langs) if (!LANGS.includes(l)) throw new Error(`Unknown language "${l}" (use vi, en or vi,en).`);
if (!(seconds > 2 && fps >= 10 && fps <= 60)) throw new Error('Use --seconds > 2 and --fps between 10 and 60.');
const flowers = FLOWERS.filter((f) => !only || only.includes(f.id));
if (flowers.length === 0) throw new Error(`No species match --only ${only?.join(',')}.`);

function storyFor(flower: FlowerData, lang: Lang): MomentStory {
  const dict = getDict(lang);
  const text = flower.text[lang];
  return createMomentStory({
    lang,
    flowerName: text.name,
    scientificName: flower.scientificName,
    visual: flower.visual,
    stages: flower.stages,
    stageTexts: flower.stages.map((s) => ({ id: s.id, name: text.stages[s.id]?.name ?? dict.stageNames[s.id] })),
    labels: dict.player,
    brandUrl: brandAddress(absoluteUrl(site, base, routes.flower(lang, flower.slugs[lang]))),
  });
}

async function framePng(story: MomentStory, progress: number): Promise<Buffer> {
  const svg = storyToSvg(buildStoryFrame(story.at(progress), storyMeasure), storyText);
  return sharp(Buffer.from(svg)).png({ compressionLevel: 1 }).toBuffer();
}

async function encode(story: MomentStory, file: string): Promise<void> {
  const total = Math.round(seconds * fps);
  const ff = spawn(
    'ffmpeg',
    ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', file],
    { stdio: ['pipe', 'inherit', 'inherit'] },
  );
  const done = new Promise<void>((res, rej) => {
    ff.on('error', (err) => rej(new Error(`Could not run ffmpeg (${err.message}). Install it, or use --stills-only.`)));
    ff.on('close', (code) => (code === 0 ? res() : rej(new Error(`ffmpeg exited with code ${code}`))));
  });
  // Keep a few frames in flight (sharp rasterises on libvips threads) but write them in order.
  const WINDOW = 4;
  const pending: Promise<Buffer>[] = [];
  const holds = new Map<number, Promise<Buffer>>();
  const render = (i: number): Promise<Buffer> => {
    const p = clipProgress(i / fps, seconds);
    if (p !== 0 && p !== 1) return framePng(story, p);
    let held = holds.get(p);
    if (!held) holds.set(p, (held = framePng(story, p)));
    return held;
  };
  try {
    for (let i = 0; i < total; i++) {
      pending.push(render(i));
      if (pending.length >= WINDOW || i === total - 1) {
        for (const buf of await Promise.all(pending.splice(0))) {
          if (!ff.stdin.write(buf)) await new Promise<void>((res) => ff.stdin.once('drain', res));
        }
      }
    }
  } finally {
    ff.stdin.end();
  }
  await done;
}

async function main(): Promise<void> {
  const started = Date.now();
  for (const lang of langs) {
    const dir = join(out, lang);
    mkdirSync(dir, { recursive: true });
    const captions: string[] = [];
    for (const flower of flowers) {
      const story = storyFor(flower, lang);
      const t0 = Date.now();
      // The still card is the middle of full bloom: the same frame the site uses as the poster.
      await sharp(await framePng(story, story.progressOf('full-bloom'))).toFile(join(dir, `${flower.id}.png`));
      if (!stillsOnly) await encode(story, join(dir, `${flower.id}.mp4`));
      const text = flower.text[lang];
      const url = absoluteUrl(site, base, routes.flower(lang, flower.slugs[lang]));
      const tag = text.name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').replace(/[^a-z0-9]/gi, '').toLowerCase();
      captions.push(`${flower.id}\n${text.name} — ${text.tagline}\n${getDict(lang).player.illustrative}\n${url}\n#bloomora #timelapse #${tag}\n`);
      console.log(`${lang}/${flower.id}: ${stillsOnly ? 'card' : 'card + video'} in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
    }
    writeFileSync(join(dir, 'captions.txt'), `${captions.join('\n')}`);
  }
  console.log(`clips: done in ${((Date.now() - started) / 1000).toFixed(0)} s → ${out}`);
  if (new URL(site).hostname === 'bloomora.example') {
    console.warn('warning: the watermark shows the placeholder domain. Pass --site https://your-domain (or set SITE_URL).');
  }
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
