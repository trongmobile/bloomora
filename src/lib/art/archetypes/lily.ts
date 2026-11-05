import {
  CX,
  GROUND_Y,
  clamp01,
  cubicAt,
  darken,
  f,
  leafAt,
  lighten,
  linearGradient,
  mix,
  petalAt,
  ramp,
  smooth,
  type Ctx,
  type Cubic,
} from '../core';
import { SEED_Y, fallenPetals, roots, stemStroke } from '../scene';
import type { ArchetypeRenderer } from './types';

const MAX_H = 280;
const UNDER = SEED_Y - GROUND_Y;

/** A scaly bulb: overlapping pale scales. */
function bulb(c: Ctx): string {
  const k = 1 - 0.35 * smooth(0.2, 1, c.s.leaf);
  let scales = '';
  for (let i = 0; i < 7; i++) {
    const a = -63 + i * 21;
    scales += petalAt(0, 26, a, 0, 52, 22, 0.5, 0.5);
  }
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6})" opacity="${f(k * clamp01(c.s.seed + 0.5))}" aria-hidden="true">` +
    `<path d="${scales}" fill="${c.url('lBulb')}" stroke="#7a5a30" stroke-width="1.1" stroke-linejoin="round"/>` +
    `</g>`
  );
}

/** Lance-shaped leaves spiralling up the stem. */
function stemLeaves(c: Ctx, curve: Cubic): string {
  const amt = smooth(0.02, 1, c.s.leaf);
  if (amt < 0.03) return '';
  const dry = smooth(0.25, 1, c.s.wilt);
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  let d = '';
  const n = 12;
  for (let i = 0; i < n; i++) {
    const reveal = smooth((i / n) * 0.75, (i / n) * 0.75 + 0.3, amt);
    if (reveal < 0.04) continue;
    const t = 0.08 + (i / n) * 0.74;
    const [x, y] = cubicAt(curve, t);
    const side = i % 2 === 0 ? 1 : -1;
    const len = (66 - i * 2.8) * reveal;
    d += leafAt(x, y, side > 0 ? -38 + dry * 30 : 218 - dry * 30, len, 6.5, 0.1, 0.8, side);
  }
  return d ? `<path d="${d}" fill="${dry > 0.05 ? col : c.url('leaf')}" stroke="${darken(col, 0.35)}" stroke-width=".8" stroke-linejoin="round"/>` : '';
}

/** One trumpet bloom seen from the side: six curving tepals, a throat, stamens. */
function bloom(c: Ctx, x: number, y: number, rot: number, size: number, bud: number, open: number, wilt: number): string {
  const { pal } = c;
  const L = 78 * size * (0.35 + 0.65 * bud);
  const dry = '#9a8a6a';
  const fade = smooth(0.05, 0.9, wilt);
  const fill = mix(pal.petal, dry, fade);
  const deep = mix(pal.petalDeep, dry, fade);
  let g = '';
  if (open < 0.05) {
    const wd = L * 0.3;
    g += `<path d="${petalAt(0, 0, 0, 0, L * 0.85, wd, 0.7, 0.55)}" fill="${mix(pal.leaf, pal.petal, 0.55)}" stroke="${darken(pal.leafDeep, 0.2)}" stroke-width=".9"/>`;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
  }
  const spread = 14 + 46 * open;
  const curl = (1 - 0.4 * wilt) * (0.5 + 0.5 * open);
  const ang = [-spread * 1.5, -spread * 0.8, 0, spread * 0.8, spread * 1.5];
  // Back tepals first, then the front ones.
  ang.forEach((a, i) => {
    if (i === 2) return;
    g += `<path d="${petalAt(0, 0, a, 0, L * curl, L * 0.36, 0.7, 0.55)}" fill="${deep}" stroke="${darken(deep, 0.3)}" stroke-width=".7" stroke-linejoin="round"/>`;
  });
  for (const a of [-spread * 0.4, spread * 0.4, 0]) {
    g += `<path d="${petalAt(0, 0, a, 0, L * curl * 1.02, L * 0.4, 0.7, 0.55)}" fill="${fill}" stroke="${darken(fill, 0.3)}" stroke-width=".7" stroke-linejoin="round"/>`;
  }
  g += `<path d="M0 0L${f(-spread * 0.12)} ${f(-L * 0.5 * curl)}M0 0L0 ${f(-L * 0.55 * curl)}M0 0L${f(spread * 0.12)} ${f(-L * 0.5 * curl)}" stroke="${darken(pal.accent ?? '#8a4a30', 0.1)}" stroke-width="1.2" opacity="${f(1 - fade)}"/>`;
  for (const dx of [-spread * 0.12, 0, spread * 0.12]) {
    g += `<ellipse cx="${f(dx)}" cy="${f(-L * 0.52 * curl)}" rx="2.6" ry="5" fill="${pal.accent ?? '#a8453c'}" opacity="${f(1 - fade)}"/>`;
  }
  g += `<path d="${petalAt(0, 0, 0, 0, L * 0.3, L * 0.2, 0.2, 0.5)}" fill="${mix(pal.center, dry, fade)}" opacity=".75"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}

export const lily: ArchetypeRenderer = {
  defs(c) {
    return (
      linearGradient(c.id('lBulb'), [[0, '#f1dcc0'], [1, '#c79a6a']], 0, 0, 1, 1) +
      linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0)
    );
  },
  plant(c) {
    const { s } = c;
    let out = roots(c, { y: SEED_Y + 30, depth: 58, spread: 100, laterals: 8 }) + bulb(c);
    const total = Math.max(0.0001, s.stem * (MAX_H + UNDER));
    const droop = smooth(0.3, 1, s.wilt);
    const sway = c.sway * 3 * ramp(0.2, 1, s.stem);
    const curve: Cubic = {
      p0: [CX, SEED_Y - 6],
      p1: [CX + 3, SEED_Y - total * 0.35],
      p2: [CX - 5 + sway * 0.5, SEED_Y - total * 0.72],
      p3: [CX + sway + droop * 10, SEED_Y - 10 - total + droop * 10],
    };
    if (s.stem > 0.015) out += stemStroke(curve, 6 + 1.5 * s.stem, mix(c.pal.stem, '#8c7a3c', smooth(0.3, 1, s.wilt) * 0.5));
    out += stemLeaves(c, curve);
    if (s.bud > 0.02 && s.stem > 0.5) {
      const bud = smooth(0, 1, s.bud);
      const open = smooth(0, 1, s.open);
      const wilt = smooth(0, 1, s.wilt);
      const [tx, ty] = cubicAt(curve, 1);
      const specs = [
        { dx: -34, dy: 26, rot: -62, size: 0.82, delay: 0.25 },
        { dx: 36, dy: 16, rot: 64, size: 0.86, delay: 0.12 },
        { dx: 0, dy: 0, rot: 4, size: 1, delay: 0 },
      ];
      for (const b of specs) {
        const sh = (v: number) => clamp01((v - b.delay) / (1 - b.delay));
        const lb = clamp01(ramp(b.delay * 0.4, 1, s.bud) * (0.4 + 0.6 * bud));
        if (lb < 0.04) continue;
        const bx = tx + b.dx;
        const by = ty + b.dy;
        if (b.dx !== 0) out += `<path d="M${f(tx - b.dx * 0.15)} ${f(ty + b.dy * 1.8)}Q${f(tx)} ${f(by + 4)} ${f(bx)} ${f(by)}" stroke="${c.pal.stem}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
        out += bloom(c, bx, by, b.rot + droop * 12 * Math.sign(b.rot || 1), b.size, lb, sh(open), sh(wilt));
      }
    }
    if (s.wilt > 0.35) out += fallenPetals(c, smooth(0.35, 1, s.wilt) * 7, c.pal.petal, { spread: 140, size: 14, air: 0.1 });
    void lighten;
    return out;
  },
};
