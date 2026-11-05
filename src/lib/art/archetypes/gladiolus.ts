import {
  CX,
  GROUND_Y,
  clamp01,
  cubicAngle,
  cubicAt,
  darken,
  f,
  lighten,
  linearGradient,
  mix,
  petalAt,
  ramp,
  ribbonPath,
  smooth,
  type Ctx,
  type Cubic,
} from '../core';
import { SEED_Y, fallenPetals, roots, stemStroke } from '../scene';
import type { ArchetypeRenderer } from './types';

const MAX_H = 300;
const UNDER = SEED_Y - GROUND_Y;
const FLORETS = 10;

/** The corm: a flattened brown disc that shrivels as the plant draws on it. */
function corm(c: Ctx): string {
  const k = 1 - 0.5 * smooth(0.2, 1, c.s.leaf);
  return (
    `<g transform="translate(${CX} ${SEED_Y + 12})" opacity="${f(k * clamp01(c.s.seed + 0.5))}" aria-hidden="true">` +
    `<path d="M-24 4C-24 -14 -10 -22 0 -22C10 -22 24 -14 24 4C24 18 12 24 0 24C-12 24 -24 18 -24 4Z" fill="${c.url('gCorm')}" stroke="#4a3320" stroke-width="1.3"/>` +
    `<path d="M-18 -4Q0 -12 18 -4M-20 6Q0 -2 20 6M-14 16Q0 10 14 16" fill="none" stroke="#d9bd86" stroke-width="1" opacity=".5"/>` +
    `</g>`
  );
}

/** Sword-shaped leaves in an upright fan. */
function blades(c: Ctx): string {
  const { s } = c;
  const amt = smooth(0.02, 1, s.leaf) * 0.85 + smooth(0, 0.3, s.stem) * 0.15;
  if (amt < 0.02 || s.stem < 0.1) return '';
  const dry = smooth(0.25, 1, s.wilt);
  const sway = c.sway * 3;
  const defs = [
    { dx: -70, len: 250, w: 11, off: -14 },
    { dx: -28, len: 280, w: 12, off: -5 },
    { dx: 30, len: 270, w: 12, off: 5 },
    { dx: 72, len: 240, w: 11, off: 14 },
  ];
  let out = '';
  defs.forEach((d, i) => {
    const g = smooth(i * 0.06, 0.6 + i * 0.06, amt);
    if (g < 0.02) return;
    const L = d.len * g;
    const bx = CX + d.off;
    const dx = d.dx * smooth(0.15, 1, g) + sway;
    const curve: Cubic = {
      p0: [bx, GROUND_Y + 4],
      p1: [bx + dx * 0.05, GROUND_Y - L * 0.45],
      p2: [bx + dx * 0.3, GROUND_Y - L * 0.85],
      p3: [bx + dx * 0.55 + dry * dx * 0.2, GROUND_Y - L * (0.98 - dry * 0.3)],
    };
    const col = mix(c.pal.leaf, '#9a8a4a', dry * 0.7);
    out += `<path d="${ribbonPath(curve, (t) => d.w * g * Math.sin(Math.PI * Math.pow(t, 0.45)) * (1 - 0.3 * t) + 0.5, 12)}" fill="${col}" stroke="${darken(col, 0.32)}" stroke-width="1" stroke-linejoin="round"/>`;
  });
  return out;
}

/** The spike: funnel-shaped florets facing alternate sides, opening from the bottom up. */
function spike(c: Ctx, curve: Cubic): string {
  const { s, pal } = c;
  const bud = smooth(0, 1, s.bud);
  if (bud < 0.04) return '';
  const wilt = smooth(0, 1, s.wilt);
  const shown = Math.max(1, Math.round(FLORETS * ramp(0.05, 0.9, s.bud)));
  const budCol = mix(pal.leaf, pal.petalDeep, 0.45);
  let back = '';
  let front = '';
  let buds = '';
  let throats = '';
  for (let j = 0; j < shown; j++) {
    const u = j / (FLORETS - 1);
    const t = 0.52 + 0.48 * Math.pow(u, 0.9);
    const [x, y] = cubicAt(curve, t);
    const side = j % 2 === 0 ? 1 : -1;
    const sz = 30 * (1 - 0.5 * Math.pow(u, 1.3)) * (0.5 + 0.5 * bud);
    const k = ramp(u * 0.6, u * 0.6 + 0.4, s.open);
    const dir = side * 90 - side * 12;
    const cx = x + side * 3;
    if (k < 0.05) {
      buds += petalAt(cx, y, dir, 0, sz * 0.7, sz * 0.4, 0.5, 0.55);
      continue;
    }
    if (wilt > 0.3 && smooth(0.3, 1, wilt) > 1 - (1 - u) * 0.95 - 0.05) continue;
    const fl = sz * (0.55 + 0.45 * k);
    const spread = 18 + 28 * k;
    for (const a of [-spread * 1.5, spread * 1.5]) back += petalAt(cx, y, dir + a, 0, fl * 0.85, fl * 0.7, 0.25, 0.5);
    for (const a of [-spread * 0.55, spread * 0.55, 0]) front += petalAt(cx, y, dir + a, 0, fl, fl * 0.78, 0.25, 0.5);
    throats += petalAt(cx, y, dir, 0, fl * 0.5, fl * 0.3, 0.3, 0.5);
  }
  const dryMix = smooth(0.1, 0.9, wilt);
  const backCol = mix(pal.petalDeep, '#7a6a58', dryMix);
  const frontCol = mix(pal.petal, '#a89a84', dryMix);
  let g = '';
  if (buds) g += `<path d="${buds}" fill="${budCol}" stroke="${darken(budCol, 0.3)}" stroke-width=".6"/>`;
  if (back) g += `<path d="${back}" fill="${backCol}" stroke="${darken(backCol, 0.3)}" stroke-width=".6" stroke-opacity=".6" stroke-linejoin="round"/>`;
  if (front) g += `<path d="${front}" fill="${frontCol}" stroke="${darken(frontCol, 0.3)}" stroke-width=".6" stroke-opacity=".6" stroke-linejoin="round"/>`;
  if (throats) g += `<path d="${throats}" fill="${lighten(pal.center, 0.15)}" stroke="${darken(pal.centerDeep, 0.1)}" stroke-width=".5" opacity=".85"/>`;
  return g;
}

export const gladiolus: ArchetypeRenderer = {
  defs(c) {
    return (
      linearGradient(c.id('gCorm'), [[0, '#d8b57c'], [1, '#8a6238']], 0, 0, 1, 1) +
      linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0)
    );
  },
  plant(c) {
    const { s } = c;
    let out = roots(c, { y: SEED_Y + 36, depth: 60, spread: 110, laterals: 8, color: '#efe2c0' }) + corm(c);
    const total = Math.max(0.0001, s.stem * (MAX_H + UNDER));
    const droop = smooth(0.3, 1, s.wilt);
    const sway = c.sway * 3 * ramp(0.2, 1, s.stem);
    const topX = CX + sway + droop * 10;
    const curve: Cubic = {
      p0: [CX, SEED_Y - 8],
      p1: [CX + 3, SEED_Y - total * 0.35],
      p2: [CX - 5 + sway * 0.5, SEED_Y - total * 0.72],
      p3: [topX, SEED_Y - 10 - total + droop * 10],
    };
    out += blades(c);
    if (s.stem > 0.015) out += stemStroke(curve, 5.5 + 1.5 * s.stem, mix(c.pal.stem, '#8c7a3c', smooth(0.3, 1, s.wilt) * 0.5));
    if (s.bud > 0.02 && s.stem > 0.5) out += spike(c, curve);
    if (s.wilt > 0.35) out += fallenPetals(c, smooth(0.35, 1, s.wilt) * 9, c.pal.petal, { spread: 130, size: 11, air: 0.12 });
    void cubicAngle;
    return out;
  },
};
