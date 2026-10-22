/**
 * Browser side of the clip/card export: draws a StoryFrame on a canvas with the site's own web
 * fonts, then turns it into a PNG or records a short vertical video. Loaded on demand (dynamic
 * import) the first time a visitor asks for a clip, so it never weighs on the page itself.
 * Nothing leaves the device: no upload, no server.
 */
import {
  STORY_COLORS,
  STORY_H,
  STORY_W,
  buildStoryFrame,
  clipProgress,
  logoPetals,
  type FontFace,
  type Measure,
  type StoryFrame,
  type StoryInput,
} from './frame';

const FONTS: Record<FontFace, { style: 'normal' | 'italic'; weight: number; family: string }> = {
  serif: { style: 'normal', weight: 500, family: "'Newsreader', Georgia, 'Times New Roman', serif" },
  serifItalic: { style: 'italic', weight: 500, family: "'Newsreader', Georgia, 'Times New Roman', serif" },
  sans: { style: 'normal', weight: 400, family: "'Be Vietnam Pro', system-ui, -apple-system, 'Segoe UI', sans-serif" },
  sansBold: { style: 'normal', weight: 600, family: "'Be Vietnam Pro', system-ui, -apple-system, 'Segoe UI', sans-serif" },
};
const FACES = Object.keys(FONTS) as FontFace[];

export const fontShorthand = (face: FontFace, size: number): string => {
  const f = FONTS[face];
  return `${f.style} ${f.weight} ${size}px ${f.family}`;
};

let probe: CanvasRenderingContext2D | null = null;
/** Measures text with the same fonts the frame is drawn with. */
export const measureText: Measure = (text, face, size) => {
  probe ??= document.createElement('canvas').getContext('2d');
  if (!probe) return text.length * size * 0.55;
  probe.font = fontShorthand(face, size);
  return probe.measureText(text).width;
};

/** Makes sure every face (and the glyph subsets the text needs) is loaded before measuring or drawing. */
export async function loadStoryFonts(sample: string): Promise<void> {
  if (!document.fonts?.load) return;
  try {
    await Promise.all(FACES.map((face) => document.fonts.load(fontShorthand(face, 40), sample)));
  } catch {
    /* fall back to the system fonts in the stack */
  }
}

/** Layout for `input` using the browser's real text metrics. */
export const layoutStory = (input: StoryInput): StoryFrame => buildStoryFrame(input, measureText);

function artImage(frame: StoryFrame): Promise<HTMLImageElement> {
  const { crop, inner } = frame.art;
  const size = frame.card.w;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${crop.x} ${crop.y} ${crop.w} ${crop.h}">${inner}</svg>`;
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('The illustration could not be rasterised.'));
    };
    img.src = url;
  });
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const k = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + k, y);
  ctx.arcTo(x + w, y, x + w, y + h, k);
  ctx.arcTo(x + w, y + h, x, y + h, k);
  ctx.arcTo(x, y + h, x, y, k);
  ctx.arcTo(x, y, x + w, y, k);
  ctx.closePath();
}

function withAlpha(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

/** Everything that does not change while a clip plays: backdrop, glow, logo, card shadow, pill. */
function drawBackdrop(ctx: CanvasRenderingContext2D, frame: StoryFrame): void {
  const c = STORY_COLORS;
  const bg = ctx.createLinearGradient(0, 0, 0, frame.height);
  bg.addColorStop(0, c.bgTop);
  bg.addColorStop(1, c.bgBottom);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, frame.width, frame.height);

  const { glow, logo, card, pill } = frame;
  const g = ctx.createRadialGradient(glow.cx, glow.cy, 0, glow.cx, glow.cy, glow.r);
  g.addColorStop(0, withAlpha(glow.color, 0.5));
  g.addColorStop(1, withAlpha(glow.color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, frame.width, frame.height);

  ctx.fillStyle = withAlpha(c.logoPetal, 0.88);
  for (const p of logoPetals(logo.x, logo.y, logo.size)) {
    ctx.beginPath();
    ctx.arc(p.cx, p.cy, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = c.logoCenter;
  ctx.beginPath();
  ctx.arc(logo.x + logo.size / 2, logo.y + logo.size / 2, logo.size * 0.11, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.shadowColor = 'rgba(42,31,46,0.18)';
  ctx.shadowBlur = 48;
  ctx.shadowOffsetY = 18;
  ctx.fillStyle = c.white;
  roundedRect(ctx, card.x, card.y, card.w, card.h, card.r);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = 'rgba(255,255,255,0.78)';
  roundedRect(ctx, pill.x, pill.y, pill.w, pill.h, pill.r);
  ctx.fill();
}

function drawContent(ctx: CanvasRenderingContext2D, frame: StoryFrame, art: HTMLImageElement): void {
  const c = STORY_COLORS;
  const { card, bar } = frame;

  ctx.save();
  roundedRect(ctx, card.x, card.y, card.w, card.h, card.r);
  ctx.clip();
  const stage = ctx.createLinearGradient(0, card.y, 0, card.y + card.h);
  stage.addColorStop(0, c.stageTop);
  stage.addColorStop(1, c.stageBottom);
  ctx.fillStyle = stage;
  ctx.fillRect(card.x, card.y, card.w, card.h);
  ctx.drawImage(art, card.x, card.y, card.w, card.h);
  ctx.restore();

  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  ctx.lineWidth = 3;
  roundedRect(ctx, card.x + 1.5, card.y + 1.5, card.w - 3, card.h - 3, card.r);
  ctx.stroke();

  if (bar) {
    ctx.fillStyle = c.track;
    roundedRect(ctx, bar.x, bar.y, bar.w, bar.h, bar.h / 2);
    ctx.fill();
    const fill = ctx.createLinearGradient(bar.x, 0, bar.x + bar.w, 0);
    fill.addColorStop(0, '#23694a');
    fill.addColorStop(1, c.accent);
    ctx.fillStyle = fill;
    roundedRect(ctx, bar.x, bar.y, Math.max(bar.h, bar.w * bar.value), bar.h, bar.h / 2);
    ctx.fill();
    ctx.fillStyle = withAlpha(c.tick, 0.7);
    for (const t of bar.ticks) {
      roundedRect(ctx, bar.x + bar.w * t - 1.5, bar.y - 6, 3, bar.h + 12, 1.5);
      ctx.fill();
    }
  }

  ctx.textBaseline = 'alphabetic';
  for (const t of frame.texts) {
    ctx.font = fontShorthand(t.face, t.size);
    ctx.textAlign = t.align === 'center' ? 'center' : 'left';
    ctx.fillStyle = t.color;
    ctx.fillText(t.text, t.x, t.y);
  }
}

function makeCanvas(scale: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(STORY_W * scale);
  canvas.height = Math.round(STORY_H * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available.');
  ctx.scale(scale, scale);
  return { canvas, ctx };
}

/** A single 1080×1920 PNG of one frame. */
export async function renderStill(frame: StoryFrame): Promise<Blob> {
  const { canvas, ctx } = makeCanvas(1);
  const art = await artImage(frame);
  drawBackdrop(ctx, frame);
  drawContent(ctx, frame, art);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('PNG export failed.'))), 'image/png');
  });
}

const RECORDER_TYPES: readonly { mime: string; ext: 'mp4' | 'webm' }[] = [
  { mime: 'video/mp4;codecs=avc1.42E01E', ext: 'mp4' },
  { mime: 'video/mp4', ext: 'mp4' },
  { mime: 'video/webm;codecs=vp9', ext: 'webm' },
  { mime: 'video/webm;codecs=vp8', ext: 'webm' },
  { mime: 'video/webm', ext: 'webm' },
];

/** The best video container this browser can record, or null when it cannot record canvas at all. */
export function pickRecorderType(): { mime: string; ext: 'mp4' | 'webm' } | null {
  if (typeof MediaRecorder === 'undefined' || typeof MediaRecorder.isTypeSupported !== 'function') return null;
  if (typeof HTMLCanvasElement === 'undefined' || typeof HTMLCanvasElement.prototype.captureStream !== 'function') return null;
  return RECORDER_TYPES.find((t) => MediaRecorder.isTypeSupported(t.mime)) ?? null;
}

export interface RecordOptions {
  /** Content of the frame at playback position 0..1. */
  frameAt: (progress: number) => StoryInput;
  durationSec: number;
  fps?: number;
  /** Output size relative to 1080×1920. 2/3 gives 720×1280, light enough for phones. */
  scale?: number;
  onProgress?: (fraction: number) => void;
  signal?: AbortSignal;
}

const nextFrame = (): Promise<void> => new Promise((resolve) => requestAnimationFrame(() => resolve()));

/**
 * Records the time-lapse in real time: each animation frame the illustration is rasterised and
 * drawn, and MediaRecorder encodes the canvas. A slow device drops frames but keeps the timing.
 */
export async function recordClip(opts: RecordOptions): Promise<{ blob: Blob; mime: string; ext: 'mp4' | 'webm' }> {
  const type = pickRecorderType();
  if (!type) throw new Error('Video recording is not supported.');
  const fps = opts.fps ?? 30;
  const { canvas, ctx } = makeCanvas(opts.scale ?? 2 / 3);
  const first = layoutStory(opts.frameAt(0));
  drawBackdrop(ctx, first);

  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, { mimeType: type.mime, videoBitsPerSecond: 5_000_000 });
  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };
  const stopped = new Promise<void>((resolve, reject) => {
    recorder.onstop = () => resolve();
    recorder.onerror = () => reject(new Error('Recording failed.'));
  });

  const paint = async (progress: number): Promise<void> => {
    const frame = layoutStory(opts.frameAt(progress));
    const art = await artImage(frame);
    drawBackdrop(ctx, frame);
    drawContent(ctx, frame, art);
  };

  await paint(0);
  recorder.start(250);
  const started = performance.now();
  try {
    for (;;) {
      if (opts.signal?.aborted) throw new DOMException('Aborted', 'AbortError');
      const t = (performance.now() - started) / 1000;
      if (t >= opts.durationSec) break;
      opts.onProgress?.(t / opts.durationSec);
      await paint(clipProgress(t, opts.durationSec));
      await nextFrame();
    }
    await paint(1);
    await new Promise((resolve) => setTimeout(resolve, 200)); // let the encoder see the last frame
  } finally {
    if (recorder.state !== 'inactive') recorder.stop();
    stream.getTracks().forEach((track) => track.stop());
  }
  await stopped;
  opts.onProgress?.(1);
  return { blob: new Blob(chunks, { type: type.mime.split(';')[0] }), mime: type.mime, ext: type.ext };
}

export function downloadFile(file: File): void {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

/** Opens the system share sheet with the file when the device can; otherwise downloads it. */
export async function shareOrDownload(file: File, meta: { title: string; text?: string }): Promise<'shared' | 'downloaded' | 'cancelled'> {
  const data: ShareData = { files: [file], title: meta.title, text: meta.text };
  if (typeof navigator.canShare === 'function' && navigator.canShare(data)) {
    try {
      await navigator.share(data);
      return 'shared';
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return 'cancelled';
      // Some browsers reject once the click gesture is spent: fall through to a download.
    }
  }
  downloadFile(file);
  return 'downloaded';
}
