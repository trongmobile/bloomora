/**
 * Shared scene pieces: soil cut-away, grass, roots and shared gradients.
 * The soil is intentionally drawn as an educational cross-section so the seed
 * and roots stay visible while the plant grows above ground.
 */
import {
  CX,
  GROUND_Y,
  H,
  W,
  clamp01,
  f,
  linearGradient,
  mulberry32,
  smoothPath,
  trimPolyline,
  type Ctx,
  dotsPath,
  mix,
} from './core';

export const SEED_Y = GROUND_Y + 62;

export function sharedDefs(c: Ctx): string {
  const p = c.pal;
  return (
    linearGradient(c.id('soil'), [
      [0, '#7a573b'],
      [0.35, '#5f402c'],
      [1, '#3a281d'],
    ]) +
    linearGradient(c.id('soilTop'), [
      [0, '#9a7650', 0.9],
      [1, '#7a573b', 0],
    ]) +
    linearGradient(c.id('leaf'), [
      [0, p.leafDeep],
      [0.55, p.leaf],
      [1, mix(p.leaf, '#e9f5c8', 0.35)],
    ], 0, 0, 1, 0) +
    linearGradient(c.id('stem'), [
      [0, p.stem],
      [1, mix(p.stem, '#ffffff', 0.12)],
    ], 0, 0, 1, 0)
  );
}

/** Soil cut-away with fixed, deterministic grain and pebbles. */
export function soilScene(c: Ctx): string {
  const rnd = mulberry32(7);
  const dots: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 70; i++) {
    dots.push({ x: rnd() * W, y: GROUND_Y + 14 + rnd() * (H - GROUND_Y - 20), r: 1 + rnd() * 2.2 });
  }
  const pebbles: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 9; i++) {
    pebbles.push({ x: rnd() * W, y: GROUND_Y + 30 + rnd() * (H - GROUND_Y - 50), r: 4 + rnd() * 5 });
  }
  // Grass tufts either side of the plant.
  let blades = '';
  const grassRnd = mulberry32(21);
  for (let i = 0; i < 46; i++) {
    const x = grassRnd() * W;
    if (Math.abs(x - CX) < 34) continue;
    const h = 10 + grassRnd() * 22;
    const lean = (grassRnd() - 0.5) * 14;
    blades += `M${f(x)} ${GROUND_Y + 2}Q${f(x + lean * 0.3)} ${f(GROUND_Y - h * 0.6)} ${f(x + lean)} ${f(GROUND_Y - h)}Q${f(x + lean * 0.5 + 3)} ${f(GROUND_Y - h * 0.5)} ${f(x + 3.5)} ${GROUND_Y + 2}Z`;
  }
  return (
    `<g aria-hidden="true">` +
    `<path d="${blades}" fill="${mix(c.pal.leafDeep, '#2f5a2c', 0.4)}" opacity=".85"/>` +
    `<path d="M0 ${GROUND_Y + 4}Q100 ${GROUND_Y - 6} 220 ${GROUND_Y + 2}T430 ${GROUND_Y + 3}T640 ${GROUND_Y}T${W} ${GROUND_Y + 4}V${H}H0Z" fill="${c.url('soil')}"/>` +
    `<path d="M0 ${GROUND_Y + 4}Q100 ${GROUND_Y - 6} 220 ${GROUND_Y + 2}T430 ${GROUND_Y + 3}T640 ${GROUND_Y}T${W} ${GROUND_Y + 4}V${GROUND_Y + 34}H0Z" fill="${c.url('soilTop')}"/>` +
    `<path d="${dotsPath(dots)}" fill="#2a1c14" opacity=".35"/>` +
    `<path d="${dotsPath(pebbles)}" fill="#a58a6a" opacity=".42"/>` +
    `</g>`
  );
}

export interface RootOptions {
  /** Where roots begin. */
  x?: number;
  y?: number;
  /** Number of lateral roots. */
  laterals?: number;
  /** Max horizontal spread. */
  spread?: number;
  /** Tap root depth in px. */
  depth?: number;
  color?: string;
}

/** A small, deterministic root system, grown by trimming polylines. */
export function roots(c: Ctx, o: RootOptions = {}): string {
  const k = clamp01(c.s.root);
  if (k <= 0.001) return '';
  const x0 = o.x ?? CX;
  const y0 = o.y ?? SEED_Y;
  const maxY0 = H - 14;
  const depth = Math.max(20, Math.min(o.depth ?? 100, maxY0 - y0 - 8));
  const spread = o.spread ?? 150;
  const laterals = o.laterals ?? 6;
  const rnd = mulberry32(99);
  const color = o.color ?? '#efe2c0';
  const maxY = H - 14;
  let out = '';
  // Tap root.
  const tap: [number, number][] = [[x0, y0]];
  for (let i = 1; i <= 6; i++) {
    tap.push([x0 + (rnd() - 0.5) * 14, Math.min(maxY, y0 + (depth * i) / 6)]);
  }
  const tapTrim = trimPolyline(tap, Math.min(1, k * 1.15));
  out += `<path d="${smoothPath(tapTrim)}" fill="none" stroke="${color}" stroke-width="${f(2 + 3 * k)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  for (let i = 0; i < laterals; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const at = 0.2 + (i / laterals) * 0.65;
    const sy = y0 + depth * at;
    const len = spread * (0.45 + rnd() * 0.55);
    const pts: [number, number][] = [[x0 + (rnd() - 0.5) * 8, sy]];
    for (let j = 1; j <= 5; j++) {
      pts.push([x0 + side * (len * j) / 5, Math.min(maxY - 2, sy + 5 * j + (rnd() - 0.3) * 8)]);
    }
    const grow = clamp01((k - at * 0.55) / (1 - at * 0.55));
    out += `<path d="${smoothPath(trimPolyline(pts, grow))}" fill="none" stroke="${color}" stroke-width="${f(1.2 + 1.6 * k)}" stroke-linecap="round" opacity=".92"/>`;
  }
  return `<g aria-hidden="true">${out}</g>`;
}

import { cubicD, darken, lighten, type Cubic } from './core';

/** A tapered-looking stem: dark outline, body and a soft highlight. */
export function stemStroke(curve: Cubic, width: number, color: string): string {
  const d = cubicD(curve);
  return (
    `<path d="${d}" fill="none" stroke="${darken(color, 0.2)}" stroke-width="${f(width + 2)}" stroke-linecap="round"/>` +
    `<path d="${d}" fill="none" stroke="${color}" stroke-width="${f(width)}" stroke-linecap="round"/>` +
    `<path d="${d}" fill="none" stroke="${lighten(color, 0.35)}" stroke-width="${f(width * 0.22)}" stroke-linecap="round" opacity=".5" transform="translate(${f(-width * 0.18)} 0)"/>`
  );
}

import { GROUND_Y as GY, mulberry32 as rng, petalAt as pAt, type Ctx as C2 } from './core';

/** Petals that have fallen to the ground (and a few still in the air). */
export function fallenPetals(_c: C2, count: number, color: string, opts: { spread?: number; y?: number; size?: number; air?: number } = {}): string {
  if (count <= 0) return '';
  const rnd = rng(1234);
  const spread = opts.spread ?? 190;
  const size = opts.size ?? 9;
  const y0 = opts.y ?? GY;
  let ground = '';
  let air = '';
  const total = Math.round(count);
  for (let i = 0; i < total; i++) {
    const x = CX + (rnd() - 0.5) * 2 * spread;
    const a = rnd() * 360;
    const inAir = rnd() < (opts.air ?? 0.25);
    const y = inAir ? y0 - 20 - rnd() * 150 : y0 + 3 + rnd() * 7;
    const d = pAt(x, y, a, 0, size * (0.8 + rnd() * 0.5), size * 0.8, 0.2, 0.5);
    if (inAir) air += d;
    else ground += d;
  }
  return (
    `<g aria-hidden="true">` +
    `<path d="${ground}" fill="${color}" stroke="${darken(color, 0.25)}" stroke-width=".5" opacity=".95"/>` +
    (air ? `<path d="${air}" fill="${color}" opacity=".8"/>` : '') +
    `</g>`
  );
}
