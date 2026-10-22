import {
  CX,
  GROUND_Y,
  GOLDEN_ANGLE,
  clamp01,
  lerp,
  cubicAngle,
  cubicAt,
  cubicD,
  cubicSplit,
  darken,
  dotsPath,
  f,
  leafPath,
  lighten,
  linearGradient,
  mix,
  petalPath,
  radialGradient,
  ramp,
  smooth,
  tf,
  type Cubic,
  type Ctx,
} from '../core';
import { SEED_Y, roots } from '../scene';
import type { ArchetypeRenderer } from './types';

const MAX_H = 322;
const TOTAL = MAX_H + (SEED_Y - GROUND_Y);

function stemCurve(c: Ctx, totalH: number): Cubic {
  const { s } = c;
  const droop = smooth(0.1, 1, s.wilt) * s.open;
  const sway = c.sway * 5 * ramp(0.2, 1, s.stem);
  const topX = CX + sway + droop * 44;
  const topY = SEED_Y - totalH + droop * 22;
  return {
    p0: [CX, SEED_Y],
    p1: [CX + 6, SEED_Y - totalH * 0.35],
    p2: [CX - 8 + sway * 0.6 + droop * 10, SEED_Y - totalH * 0.7],
    p3: [topX, topY],
  };
}

function seedShape(c: Ctx): string {
  const k = clamp01(c.s.seed);
  if (k < 0.02) return '';
  const swell = 1 + 0.18 * ramp(0, 1, c.s.root + c.s.stem * 2);
  return (
    `<g transform="${tf(CX, SEED_Y + 6, -8, swell * 1.35)}" opacity="${f(k)}" aria-hidden="true">` +
    `<path d="M0 -26C14 -22 18 6 4 28C-2 32 -4 32 -8 28C-20 6 -14 -22 0 -26Z" fill="${c.url('seedCoat')}" stroke="#2e2a26" stroke-width="1.2"/>` +
    `<path d="M-2 -22C-6 -2 -6 14 -4 28M6 -18C8 0 8 14 5 27M-9 -14C-12 2 -10 16 -8 26" fill="none" stroke="#f3eee4" stroke-width="2.2" opacity=".55" stroke-linecap="round"/>` +
    `</g>`
  );
}

function leaves(c: Ctx, curve: Cubic, totalH: number): string {
  const { s } = c;
  if (s.leaf <= 0.01 && s.stem < 0.05) return '';
  let out = '';
  // Cotyledons: the first, rounded leaf pair.
  const coty = smooth(0.02, 0.2, s.stem) * (1 - smooth(0.55, 0.95, s.leaf));
  if (coty > 0.01) {
    const [tx, ty] = cubicAt(curve, 1);
    for (const side of [-1, 1]) {
      out += `<g transform="${tf(tx, ty + 3, side < 0 ? 188 : -8, coty, side < 0 ? -coty : coty)}"><path d="${leafPath(40, 17, 0.12, 0.1)}" fill="${c.url('leaf')}" stroke="${darken(c.pal.leafDeep, 0.2)}" stroke-width=".8"/></g>`;
    }
  }
  const N = 9;
  const dry = smooth(0.15, 1, s.wilt);
  const leafFill = dry > 0.02 ? c.url('leafDry') : c.url('leaf');
  const outline = darken(mix(c.pal.leaf, '#9a8a4a', dry * 0.7), 0.35);
  const veinCol = lighten(mix(c.pal.leaf, '#b49b52', dry * 0.7), 0.5);
  for (let i = 0; i < N; i++) {
    const hf = 0.08 + (i / (N - 1)) * 0.76; // fraction of max height
    const show = smooth((i / N) * 0.85, (i / N) * 0.85 + 0.25, s.leaf);
    if (show < 0.02) continue;
    const t = (hf * MAX_H + (SEED_Y - GROUND_Y)) / Math.max(totalH, 1);
    if (t >= 0.97) continue;
    const [x, y] = cubicAt(curve, t);
    const side = i % 2 === 0 ? 1 : -1;
    const grow = lerp(0.35, 1, smooth(0.1, 0.85, s.leaf));
    const size = (1.08 - hf * 0.5) * show * grow;
    const len = 112 * size;
    const wid = 62 * size;
    const pl = 26 * size;
    const flutter = c.sway * 3 * side;
    const sag = 1 + dry * 0.5;
    // Petiole rises out of the stem, then the blade arcs outward and droops.
    const ex = x + side * pl * 0.82;
    const ey = y - pl * 0.5;
    out +=
      `<path d="M${f(x)} ${f(y)}Q${f(x + side * pl * 0.5)} ${f(y - pl * 0.55)} ${f(ex)} ${f(ey)}" fill="none" stroke="${c.pal.stem}" stroke-width="${f(3 * size + 1)}" stroke-linecap="round"/>` +
      `<g transform="${tf(ex, ey, (side > 0 ? -12 : 192) + flutter + dry * side * 16, 1, side > 0 ? 1 : -1)}">` +
      `<path d="${leafPath(len, wid, 0.26 * sag, 0.55)}" fill="${leafFill}" stroke="${outline}" stroke-width="1"/>` +
      `<path d="M2 0Q${f(len * 0.5)} ${f(len * 0.07 * sag)} ${f(len * 0.93)} ${f(len * 0.25 * sag)}" fill="none" stroke="${veinCol}" stroke-width="1.7" opacity=".75" stroke-linecap="round"/>` +
      `</g>`;
  }
  return out;
}

function head(c: Ctx, curve: Cubic): string {
  const { s, pal } = c;
  if (s.bud < 0.03) return '';
  const [hx, hy] = cubicAt(curve, 1);
  const ang = cubicAngle(curve, 1);
  const droop = smooth(0.1, 1, s.wilt) * s.open;
  const tilt = droop * 38 + (ang + 90) * 0.5;
  const R = 92;
  const bud = smooth(0, 1, s.bud);
  const rb = 6 + (62 - 6) * Math.pow(bud, 0.85);
  const open = smooth(0, 1, s.open);
  const diskR = (40 * (1 + 0.14 * s.fruit)) * smooth(0, 0.55, s.open) + 7 * bud * (1 - smooth(0, 0.3, s.open));
  const squash = 1 - 0.18 * droop;
  let g = '';
  // Back bracts (phyllaries)
  const nb = 15;
  for (let i = 0; i < nb; i++) {
    const a = (i / nb) * 360;
    const len = rb * (0.95 + 0.25 * open) * 0.95;
    g += `<g transform="${tf(0, 0, a, 1)}"><path d="${leafPath(len, rb * 0.42, 0.04, 0.75)}" fill="${c.url(s.wilt > 0.3 ? 'leafDry' : 'bract')}" stroke="${darken(pal.leafDeep, 0.25)}" stroke-width=".8"/></g>`;
  }
  g += `<circle r="${f(rb * 0.6)}" fill="${c.url(s.wilt > 0.3 ? 'leafDry' : 'bract')}"/>`;
  // Petals (two rings, offset)
  const petalK = smooth(0.03, 1, s.open);
  if (petalK > 0.01) {
    const wiltCol = mix(pal.petal, '#8a6a34', smooth(0.05, 0.85, s.wilt));
    const L = (R * 0.62) * petalK * (1 - 0.5 * smooth(0.2, 1, s.wilt));
    const Wd = 21 * (0.55 + 0.45 * petalK) * (1 - 0.25 * s.wilt);
    const rings = [
      { n: 21, off: 0, scale: 1.0, base: diskR * 0.82 },
      { n: 21, off: 360 / 42, scale: 0.88, base: diskR * 0.8 },
    ];
    let ringIdx = 0;
    for (const ring of rings) {
      for (let i = 0; i < ring.n; i++) {
        const dropAt = (i + ringIdx * 7) / (ring.n + 7);
        if (s.wilt > 0.35 && smooth(0.35, 1, s.wilt) > 1 - dropAt * 0.9) continue;
        const a = (i / ring.n) * 360 + ring.off;
        const curl = (0.5 - ((i * 37) % 10) / 10) * 8 * petalK;
        const len = L * ring.scale * (0.92 + ((i * 53) % 9) / 90);
        g += `<g transform="${tf(0, 0, a + curl, 1)}"><path transform="translate(0 ${f(-ring.base)})" d="${petalPath(len, Wd * ring.scale, 0.55, 0.42)}" fill="${s.wilt > 0.05 ? wiltCol : c.url('petal')}" stroke="${darken(pal.petalDeep, 0.15)}" stroke-width=".7" stroke-opacity=".5"/></g>`;
      }
      ringIdx++;
    }
  }
  // Disk
  if (diskR > 0.5) {
    const green = 1 - smooth(0.05, 0.6, s.open);
    const fresh = mix(pal.centerDeep, '#1d1208', smooth(0, 1, s.fruit) * 0.4);
    g += `<circle r="${f(diskR)}" fill="${mix(fresh, pal.leaf, green * 0.8)}"/>`;
    g += `<circle r="${f(diskR)}" fill="${c.url('disk')}" opacity="${f(0.55 + 0.45 * open)}"/>`;
    // phyllotaxis florets / seeds
    const count = Math.round(40 + 180 * smooth(0.1, 1, s.open));
    const dots: { x: number; y: number; r: number }[] = [];
    const lightDots: { x: number; y: number; r: number }[] = [];
    const rr = diskR * 0.96;
    for (let i = 1; i <= count; i++) {
      const rad = rr * Math.sqrt(i / 220);
      const th = i * GOLDEN_ANGLE;
      const seedPhase = smooth(0, 1, s.fruit);
      const dr = (1.1 + 1.6 * (rad / rr)) * (1 + 0.8 * seedPhase);
      const d = { x: Math.cos(th) * rad, y: Math.sin(th) * rad, r: dr };
      if (seedPhase > 0.2 && i % 2 === 0) lightDots.push(d);
      else dots.push(d);
    }
    g += `<path d="${dotsPath(dots)}" fill="${mix('#2b1a0c', pal.accent ?? '#c98a2b', 0.25 * (1 - s.fruit))}" opacity=".78"/>`;
    if (lightDots.length) g += `<path d="${dotsPath(lightDots)}" fill="#cfc7b5" opacity="${f(0.8 * smooth(0.2, 1, s.fruit))}"/>`;
    g += `<circle r="${f(diskR)}" fill="none" stroke="${darken(pal.centerDeep, 0.3)}" stroke-width="1" opacity=".5"/>`;
  }
  return `<g transform="${tf(hx, hy, tilt, 1, squash)}">${g}</g>`;
}

export const sunflower: ArchetypeRenderer = {
  defs(c) {
    const p = c.pal;
    return (
      linearGradient(c.id('petal'), [
        [0, p.petalDeep],
        [0.55, p.petal],
        [1, p.petalTip ?? lighten(p.petal, 0.25)],
      ], 0, 1, 0, 0) +
      radialGradient(c.id('disk'), [
        [0, lighten(p.center, 0.1), 0.0],
        [0.55, p.center, 0.55],
        [1, p.centerDeep, 0.95],
      ]) +
      linearGradient(c.id('leafDry'), [
        [0, '#7a6a30'],
        [0.6, '#a39446'],
        [1, '#c2b46a'],
      ], 0, 0, 1, 0) +
      linearGradient(c.id('bract'), [
        [0, darken(p.leaf, 0.2)],
        [1, p.leaf],
      ], 0, 0, 1, 0) +
      linearGradient(c.id('seedCoat'), [
        [0, '#2d2a28'],
        [1, '#58524c'],
      ], 0, 0, 1, 0)
    );
  },
  plant(c) {
    const { s } = c;
    const totalH = Math.max(0.0001, s.stem * TOTAL);
    const curve = cubicSplit(stemCurve(c, TOTAL), 1); // full curve shape, scaled below
    // Build the curve for the *current* height so the plant grows upward.
    const cur = stemCurve(c, totalH);
    void curve;
    const w = 6 + 9 * smooth(0, 1, s.stem);
    let out = roots(c, { depth: 96, spread: 130, laterals: 6 });
    out += `<g aria-hidden="true">`;
    out += seedShape(c);
    out += `</g>`;
    if (s.stem > 0.01) {
      const stemColor = mix(c.pal.stem, '#8c7a3c', smooth(0.2, 1, s.wilt) * 0.55);
      out += `<path d="${cubicD(cur)}" fill="none" stroke="${darken(stemColor, 0.18)}" stroke-width="${f(w + 2.2)}" stroke-linecap="round"/>`;
      out += `<path d="${cubicD(cur)}" fill="none" stroke="${stemColor}" stroke-width="${f(w)}" stroke-linecap="round"/>`;
      out += `<path d="${cubicD(cur)}" fill="none" stroke="${lighten(stemColor, 0.35)}" stroke-width="${f(w * 0.22)}" stroke-linecap="round" opacity=".5" transform="translate(${f(-w * 0.18)} 0)"/>`;
      out += leaves(c, cur, totalH);
      out += head(c, cur);
    }
    return out;
  },
};
