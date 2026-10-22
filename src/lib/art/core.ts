/**
 * Core helpers for the procedural botanical illustrations.
 * Everything returns SVG *strings* so the same code can render on the server
 * (Astro), in the browser (React island) and in Node (OG image script).
 */
import type { FlowerPalette } from '../../data/types';
import type { BioState } from '../timelapse/keyframes';

export const W = 800;
export const H = 600;
export const GROUND_Y = 452;
export const CX = 400;

export const f = (x: number): string => {
  const r = Math.round(x * 10) / 10;
  return Object.is(r, -0) ? '0' : String(r);
};

export const clamp01 = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x);
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
/** Smoothstep between edge0 and edge1. */
export const smooth = (e0: number, e1: number, x: number): number => {
  const t = clamp01((x - e0) / (e1 - e0 || 1));
  return t * t * (3 - 2 * t);
};
/** Linear remap of x from [a,b] to [0,1], clamped. */
export const ramp = (a: number, b: number, x: number): number => clamp01((x - a) / (b - a || 1));

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ colour */

function parseHex(hex: string): [number, number, number] {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export function mix(a: string, b: string, t: number): string {
  const [r1, g1, b1] = parseHex(a);
  const [r2, g2, b2] = parseHex(b);
  const k = clamp01(t);
  const to = (x: number, y: number) => Math.round(x + (y - x) * k).toString(16).padStart(2, '0');
  return `#${to(r1, r2)}${to(g1, g2)}${to(b1, b2)}`;
}
export const lighten = (c: string, t: number): string => mix(c, '#ffffff', t);
export const darken = (c: string, t: number): string => mix(c, '#000000', t);

/* ----------------------------------------------------------------- shapes */

export function tf(x: number, y: number, rot = 0, sx = 1, sy = sx): string {
  return `translate(${f(x)} ${f(y)}) rotate(${f(rot)}) scale(${f(sx)} ${f(sy)})`;
}

/** Leaf pointing along +x, base at the origin. `bend` curls the tip down (+) or up (-). */
export function leafPath(len: number, wid: number, bend = 0.12, tip = 0.5): string {
  const b = bend * len;
  const tipX = len;
  const tipY = b;
  return (
    `M0 0C${f(len * 0.12)} ${f(-wid * 0.9)} ${f(len * (0.45 + tip * 0.2))} ${f(-wid * 0.85 + b * 0.5)} ${f(tipX)} ${f(tipY)}` +
    `C${f(len * (0.5 + tip * 0.15))} ${f(wid * 0.8 + b * 0.5)} ${f(len * 0.12)} ${f(wid * 0.9)} 0 0Z`
  );
}

/** Petal pointing up (-y) from the origin; `tip` 0 = round, 1 = pointed. */
export function petalPath(len: number, wid: number, tip = 0.4, belly = 0.38): string {
  const w = wid / 2;
  const by = -len * belly;
  const tipPull = tip * w * 0.9;
  return (
    `M0 0C${f(-w * 1.15)} ${f(by * 0.35)} ${f(-w * 1.25)} ${f(by)} ${f(-w * 0.75 + tipPull * 0.4)} ${f(-len * 0.8)}` +
    `C${f(-w * 0.3 + tipPull * 0.4)} ${f(-len * 1.02)} ${f(w * 0.3 - tipPull * 0.4)} ${f(-len * 1.02)} ${f(w * 0.75 - tipPull * 0.4)} ${f(-len * 0.8)}` +
    `C${f(w * 1.25)} ${f(by)} ${f(w * 1.15)} ${f(by * 0.35)} 0 0Z`
  );
}

export function trimPolyline(points: [number, number][], frac: number): [number, number][] {
  if (points.length < 2 || frac >= 1) return points;
  if (frac <= 0) return [points[0]!];
  const lens: number[] = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]!;
    const [x1, y1] = points[i]!;
    const l = Math.hypot(x1 - x0, y1 - y0);
    lens.push(l);
    total += l;
  }
  let target = total * frac;
  const out: [number, number][] = [points[0]!];
  for (let i = 1; i < points.length; i++) {
    const l = lens[i - 1]!;
    const [x0, y0] = points[i - 1]!;
    const [x1, y1] = points[i]!;
    if (target >= l) {
      out.push([x1, y1]);
      target -= l;
    } else {
      const k = l === 0 ? 0 : target / l;
      out.push([x0 + (x1 - x0) * k, y0 + (y1 - y0) * k]);
      break;
    }
  }
  return out;
}

/** Smooth path through points (Catmull-Rom to cubic Bezier). */
export function smoothPath(pts: [number, number][]): string {
  if (pts.length === 0) return '';
  if (pts.length === 1) return `M${f(pts[0]![0])} ${f(pts[0]![1])}`;
  let d = `M${f(pts[0]![0])} ${f(pts[0]![1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[Math.min(pts.length - 1, i + 2)]!;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

/** Cubic Bezier helpers for stems. */
export interface Cubic {
  p0: [number, number];
  p1: [number, number];
  p2: [number, number];
  p3: [number, number];
}
export function cubicAt(c: Cubic, t: number): [number, number] {
  const u = 1 - t;
  const x = u * u * u * c.p0[0] + 3 * u * u * t * c.p1[0] + 3 * u * t * t * c.p2[0] + t * t * t * c.p3[0];
  const y = u * u * u * c.p0[1] + 3 * u * u * t * c.p1[1] + 3 * u * t * t * c.p2[1] + t * t * t * c.p3[1];
  return [x, y];
}
/** Direction of travel in degrees (SVG rotation convention, 0 = +x). */
export function cubicAngle(c: Cubic, t: number): number {
  const u = 1 - t;
  const dx =
    3 * u * u * (c.p1[0] - c.p0[0]) + 6 * u * t * (c.p2[0] - c.p1[0]) + 3 * t * t * (c.p3[0] - c.p2[0]);
  const dy =
    3 * u * u * (c.p1[1] - c.p0[1]) + 6 * u * t * (c.p2[1] - c.p1[1]) + 3 * t * t * (c.p3[1] - c.p2[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}
export function cubicD(c: Cubic): string {
  return `M${f(c.p0[0])} ${f(c.p0[1])}C${f(c.p1[0])} ${f(c.p1[1])} ${f(c.p2[0])} ${f(c.p2[1])} ${f(c.p3[0])} ${f(c.p3[1])}`;
}
/** Sub-curve [0, t] of a cubic (de Casteljau). */
export function cubicSplit(c: Cubic, t: number): Cubic {
  const lerp2 = (a: [number, number], b: [number, number]): [number, number] => [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
  ];
  const a = lerp2(c.p0, c.p1);
  const b = lerp2(c.p1, c.p2);
  const cc = lerp2(c.p2, c.p3);
  const d = lerp2(a, b);
  const e = lerp2(b, cc);
  const p = lerp2(d, e);
  return { p0: c.p0, p1: a, p2: d, p3: p };
}

/* ------------------------------------------------------------ render ctx */

export interface RenderOptions {
  /** Unique prefix for gradient ids so several SVGs can share one page. */
  idPrefix: string;
  /** Gentle wind sway, -1..1. */
  sway?: number;
  /** Optional solid background (used by OG images). */
  background?: string;
  /** Hide the soil cut-away (used for tight crops). */
  hideSoil?: boolean;
}

export interface Ctx {
  pal: FlowerPalette;
  s: BioState;
  sway: number;
  id: (name: string) => string;
  /** Pre-built gradient reference, e.g. url(#prefix-petal). */
  url: (name: string) => string;
}

export function makeCtx(pal: FlowerPalette, s: BioState, opts: RenderOptions): Ctx {
  const id = (name: string) => `${opts.idPrefix}-${name}`;
  return { pal, s, sway: opts.sway ?? 0, id, url: (n) => `url(#${id(n)})` };
}

export function linearGradient(
  id: string,
  stops: [number, string, number?][],
  x1 = 0,
  y1 = 0,
  x2 = 0,
  y2 = 1,
): string {
  const s = stops
    .map(([o, c, op]) => `<stop offset="${f(o * 100)}%" stop-color="${c}"${op !== undefined ? ` stop-opacity="${op}"` : ''}/>`)
    .join('');
  return `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${s}</linearGradient>`;
}

export function radialGradient(
  id: string,
  stops: [number, string, number?][],
  cx = 0.5,
  cy = 0.5,
  r = 0.5,
  fx = cx,
  fy = cy,
): string {
  const s = stops
    .map(([o, c, op]) => `<stop offset="${f(o * 100)}%" stop-color="${c}"${op !== undefined ? ` stop-opacity="${op}"` : ''}/>`)
    .join('');
  return `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" fx="${fx}" fy="${fy}">${s}</radialGradient>`;
}

/** Many small circles as a single path (one DOM node instead of hundreds). */
export function dotsPath(dots: { x: number; y: number; r: number }[]): string {
  let d = '';
  for (const { x, y, r } of dots) {
    d += `M${f(x - r)} ${f(y)}a${f(r)} ${f(r)} 0 1 0 ${f(r * 2)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-r * 2)} 0`;
  }
  return d;
}

export const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/* ------------------------------------------------- baked-transform shapes */

export type Cmd =
  | ['M', number, number]
  | ['L', number, number]
  | ['C', number, number, number, number, number, number]
  | ['Q', number, number, number, number]
  | ['Z'];

export type Xf = (x: number, y: number) => [number, number];

export function cmdsToD(cmds: Cmd[], xf: Xf): string {
  let d = '';
  for (const c of cmds) {
    if (c[0] === 'Z') {
      d += 'Z';
      continue;
    }
    const out: string[] = [];
    for (let i = 1; i < c.length; i += 2) {
      const [x, y] = xf(c[i] as number, c[i + 1] as number);
      out.push(`${f(x)} ${f(y)}`);
    }
    d += c[0] + out.join(' ');
  }
  return d;
}

/** Petal outline (pointing up) as commands. */
export function petalCmds(len: number, wid: number, tip = 0.4, belly = 0.38): Cmd[] {
  const w = wid / 2;
  const by = -len * belly;
  const tp = tip * w * 0.9;
  return [
    ['M', 0, 0],
    ['C', -w * 1.15, by * 0.35, -w * 1.25, by, -w * 0.75 + tp * 0.4, -len * 0.8],
    ['C', -w * 0.3 + tp * 0.4, -len * 1.02, w * 0.3 - tp * 0.4, -len * 1.02, w * 0.75 - tp * 0.4, -len * 0.8],
    ['C', w * 1.25, by, w * 1.15, by * 0.35, 0, 0],
    ['Z'],
  ];
}

/** Leaf outline pointing along +x as commands. */
export function leafCmds(len: number, wid: number, bend = 0.12, tip = 0.5): Cmd[] {
  const b = bend * len;
  return [
    ['M', 0, 0],
    ['C', len * 0.12, -wid * 0.9, len * (0.45 + tip * 0.2), -wid * 0.85 + b * 0.5, len, b],
    ['C', len * (0.5 + tip * 0.15), wid * 0.8 + b * 0.5, len * 0.12, wid * 0.9, 0, 0],
    ['Z'],
  ];
}

/**
 * Transform factory: scale, offset, rotate about the origin, then translate.
 * `angle` in degrees, clockwise (SVG convention).
 */
export function xform(cx: number, cy: number, angleDeg = 0, ox = 0, oy = 0, sx = 1, sy = sx): Xf {
  const a = (angleDeg * Math.PI) / 180;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  return (x, y) => {
    const px = x * sx + ox;
    const py = y * sy + oy;
    return [cx + px * ca - py * sa, cy + px * sa + py * ca];
  };
}

/** A petal radiating from (cx, cy): starts `baseR` out from the centre, `angle` 0 = up. */
export function petalAt(
  cx: number,
  cy: number,
  angleDeg: number,
  baseR: number,
  len: number,
  wid: number,
  tip = 0.4,
  belly = 0.38,
): string {
  return cmdsToD(petalCmds(len, wid, tip, belly), xform(cx, cy, angleDeg, 0, -baseR));
}

/** A leaf starting at (x, y) pointing at `angle` degrees. */
export function leafAt(x: number, y: number, angleDeg: number, len: number, wid: number, bend = 0.12, tip = 0.5, flip = 1): string {
  return cmdsToD(leafCmds(len, wid, bend, tip), xform(x, y, angleDeg, 0, 0, 1, flip));
}

/**
 * A ribbon (leaf blade) following a cubic centreline with a width profile.
 * `profile(t)` returns half-width at t∈[0,1].
 */
export function ribbonPath(curve: Cubic, profile: (t: number) => number, steps = 10): string {
  const left: [number, number][] = [];
  const right: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const [x, y] = cubicAt(curve, t);
    const a = (cubicAngle(curve, t) * Math.PI) / 180;
    const w = profile(t);
    left.push([x - Math.sin(a) * w, y + Math.cos(a) * w]);
    right.push([x + Math.sin(a) * w, y - Math.cos(a) * w]);
  }
  const pts = [...left, ...right.reverse()];
  let d = `M${f(pts[0]![0])} ${f(pts[0]![1])}`;
  for (let i = 1; i < pts.length; i++) d += `L${f(pts[i]![0])} ${f(pts[i]![1])}`;
  return `${d}Z`;
}
