import {
  CX,
  GROUND_Y,
  cubicAngle,
  cubicAt,
  darken,
  f,
  lighten,
  linearGradient,
  mix,
  petalAt,
  radialGradient,
  ramp,
  ribbonPath,
  smooth,
  type Ctx,
  type Cubic,
} from '../core';
import { SEED_Y, fallenPetals, roots, stemStroke } from '../scene';
import type { ArchetypeRenderer } from './types';

const MAX_H = 270;
const UNDER = SEED_Y - GROUND_Y;

/** The bulb: a papery-brown onion shape that thins as the plant draws on it. */
function bulb(c: Ctx): string {
  const k = 1 - 0.4 * smooth(0.2, 1, c.s.leaf);
  return (
    `<g transform="translate(${CX} ${SEED_Y + 12})" opacity="${f(k)}" aria-hidden="true">` +
    `<path d="M0 -42C8 -30 24 -12 25 10C26 30 12 38 0 38C-12 38 -26 30 -25 10C-24 -12 -8 -30 0 -42Z" fill="${c.url('nBulb')}" stroke="#4a3320" stroke-width="1.4"/>` +
    `<path d="M0 -40C-6 -14 -8 14 -5 36M0 -40C6 -14 8 14 5 36M-15 -20C-20 0 -19 18 -14 31M15 -20C20 0 19 18 14 31" fill="none" stroke="#d9bd86" stroke-width="1.2" opacity=".5"/>` +
    `<path d="M-12 38Q0 45 12 38" fill="none" stroke="#6b4a2a" stroke-width="2"/>` +
    `</g>`
  );
}

/** Flat, strap-shaped, blue-green leaves. */
function leaves(c: Ctx): string {
  const { s } = c;
  const amt = smooth(0.02, 1, s.leaf) * 0.85 + smooth(0, 0.3, s.stem) * 0.15;
  if (amt < 0.02 || s.stem < 0.1) return '';
  const dry = smooth(0.2, 1, s.wilt);
  const sway = c.sway * 4;
  const defs = [
    { dx: -92, len: 230, w: 14, off: -16 },
    { dx: -44, len: 258, w: 15, off: -6 },
    { dx: 40, len: 252, w: 15, off: 6 },
    { dx: 90, len: 226, w: 14, off: 16 },
  ];
  let out = '';
  defs.forEach((d, i) => {
    const g = smooth(i * 0.07, 0.6 + i * 0.07, amt);
    if (g < 0.02) return;
    const L = d.len * g;
    const dx = d.dx * smooth(0.15, 1, g) + sway;
    const bx = CX + d.off;
    const curve: Cubic = {
      p0: [bx, GROUND_Y + 4],
      p1: [bx + dx * 0.08, GROUND_Y - L * 0.45],
      p2: [bx + dx * 0.4, GROUND_Y - L * 0.85],
      p3: [bx + dx * (0.95 + dry * 0.15), GROUND_Y - L * (0.78 - dry * 0.3)],
    };
    const col = mix(c.pal.leaf, '#9a8a4a', dry * 0.7);
    out += `<path d="${ribbonPath(curve, (t) => d.w * g * Math.sin(Math.PI * Math.pow(t, 0.5)) * (1 - 0.15 * t) + 0.5, 12)}" fill="${col}" stroke="${darken(col, 0.32)}" stroke-width="1" stroke-linejoin="round"/>`;
  });
  return out;
}

/** One floret seen face-on: six white tepals around a small yellow cup. */
function floret(c: Ctx, x: number, y: number, rot: number, size: number, open: number, wilt: number): string {
  const { pal } = c;
  const L = 30 * size * (0.3 + 0.7 * open);
  const W = 22 * size * (0.5 + 0.5 * open);
  const fill = wilt > 0.05 ? mix(pal.petal, '#b59a6a', wilt * 0.85) : pal.petal;
  const stroke = darken(pal.petalDeep, 0.1);
  let g = '';
  for (let i = 0; i < 6; i++) {
    g += `<path d="${petalAt(0, 0, i * 60, 0, L, W, 0.35, 0.5)}" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`;
  }
  const cup = 9 * size * (0.4 + 0.6 * open);
  g += `<ellipse rx="${f(cup)}" ry="${f(cup * 0.85)}" fill="${c.url('nCup')}" stroke="${darken(pal.center, 0.3)}" stroke-width=".9"/>`;
  g += `<ellipse rx="${f(cup * 0.45)}" ry="${f(cup * 0.38)}" fill="${pal.centerDeep}" opacity=".75"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}

/** The flower cluster: a papery bud sheath, then a handful of fragrant florets on short stalks. */
function cluster(c: Ctx, x: number, y: number, rot: number): string {
  const { s, pal } = c;
  const bud = smooth(0, 1, s.bud);
  if (bud < 0.03) return '';
  const open = smooth(0, 1, s.open);
  const wilt = smooth(0, 1, s.wilt);
  let g = '';
  // Papery sheath that splits as the buds swell.
  const sheath = 1 - smooth(0.4, 1, s.open);
  if (sheath > 0.02) {
    g += `<path d="${petalAt(0, 4, 0, 0, 52 * (0.3 + 0.7 * bud), 22, 0.7, 0.45)}" fill="#cbb98a" stroke="#6a583a" stroke-width="1" opacity="${f(0.35 + 0.65 * sheath)}"/>`;
  }
  const spec = [
    { dx: -34, dy: -18, a: -28, k: 0, sz: 0.9 },
    { dx: 34, dy: -22, a: 24, k: 0.1, sz: 0.92 },
    { dx: 0, dy: -44, a: 0, k: 0.04, sz: 1 },
    { dx: -4, dy: -8, a: 8, k: 0.2, sz: 0.8 },
  ];
  spec.forEach((p) => {
    const o = ramp(p.k, p.k + 0.6, open);
    const stalk = Math.hypot(p.dx, p.dy) * (0.35 + 0.65 * bud);
    const px = p.dx * (0.35 + 0.65 * bud);
    const py = p.dy * (0.35 + 0.65 * bud);
    g += `<path d="M0 0L${f(px)} ${f(py)}" stroke="${pal.stem}" stroke-width="2.2" stroke-linecap="round" fill="none"/>`;
    if (o < 0.05) {
      g += `<ellipse cx="${f(px)}" cy="${f(py - 5)}" rx="4.5" ry="9" transform="rotate(${p.a} ${f(px)} ${f(py)})" fill="${lighten(pal.petal, 0.1)}" stroke="${darken(pal.petalDeep, 0.2)}" stroke-width=".8"/>`;
    } else {
      g += floret(c, px, py, p.a, p.sz, o, wilt);
    }
    void stalk;
  });
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}

export const narcissus: ArchetypeRenderer = {
  defs(c) {
    const p = c.pal;
    return (
      linearGradient(c.id('nBulb'), [[0, '#d8b57c'], [1, '#8a6238']], 0, 0, 1, 1) +
      radialGradient(c.id('nCup'), [[0, p.centerDeep], [0.6, p.center], [1, lighten(p.center, 0.25)]]) +
      linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0)
    );
  },
  plant(c) {
    const { s } = c;
    let out = roots(c, { y: SEED_Y + 48, depth: 36, spread: 100, laterals: 9, color: '#f1e8d0' });
    out += bulb(c);
    const total = Math.max(0.0001, s.stem * (MAX_H + UNDER));
    const droop = smooth(0.2, 1, s.wilt);
    const sway = c.sway * 3 * ramp(0.2, 1, s.stem);
    const topX = CX + sway + droop * 16;
    const topY = SEED_Y - 10 - total + droop * 14;
    const curve: Cubic = {
      p0: [CX, SEED_Y - 8],
      p1: [CX + 2, SEED_Y - total * 0.35],
      p2: [CX - 4 + sway * 0.5 + droop * 6, SEED_Y - total * 0.72],
      p3: [topX, topY],
    };
    out += leaves(c);
    if (s.stem > 0.015) out += stemStroke(curve, 6 + 2 * s.stem, mix(c.pal.stem, '#8c7a3c', smooth(0.3, 1, s.wilt) * 0.5));
    if (s.bud > 0.02 && s.stem > 0.5) {
      const [fx, fy] = cubicAt(curve, 1);
      out += cluster(c, fx, fy, cubicAngle(curve, 1) + 90 + droop * 22);
    }
    if (s.wilt > 0.35) out += fallenPetals(c, smooth(0.35, 1, s.wilt) * 8, c.pal.petal, { spread: 140, size: 12, air: 0.1 });
    return out;
  },
};
