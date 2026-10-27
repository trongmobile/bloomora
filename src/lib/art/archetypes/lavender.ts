import {
  CX,
  GROUND_Y,
  clamp01,
  cubicAngle,
  cubicAt,
  darken,
  f,
  leafAt,
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
import type { LocalState } from './bush';
import type { ArchetypeRenderer } from './types';

const MAX_H = 300;
const UNDER = SEED_Y - GROUND_Y;

interface StemSpec {
  /** where the stem leaves the crown, relative to the centre */
  bx: number;
  /** height relative to MAX_H */
  h: number;
  /** horizontal drift of the tip at full growth */
  lean: number;
  /** delay before this stem (and its spike) develops */
  delay: number;
}

const STEMS: StemSpec[] = [
  { bx: 0, h: 1, lean: 6, delay: 0 },
  { bx: -14, h: 0.86, lean: -62, delay: 0.1 },
  { bx: 16, h: 0.9, lean: 70, delay: 0.16 },
  { bx: -28, h: 0.66, lean: -118, delay: 0.26 },
  { bx: 30, h: 0.7, lean: 124, delay: 0.32 },
];

const WHORLS = 9;

function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(-24)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<ellipse rx="5.5" ry="8" fill="#3a2a20" stroke="#150e09" stroke-width="1"/>` +
    `<path d="M-2.5 -4Q0 -6.5 2.5 -4" stroke="#7a6454" stroke-width="1" fill="none" opacity=".6"/>` +
    `</g>`
  );
}

/** A tuft of narrow grey-green blades at the foot of the plant. */
function clump(c: Ctx): string {
  const { s } = c;
  const amt = smooth(0.02, 0.9, s.leaf);
  if (amt < 0.03) return '';
  const dry = smooth(0.3, 1, s.wilt) * 0.35;
  const fill = dry > 0.04 ? mix(c.pal.leaf, '#a08c45', dry) : c.url('leaf');
  const sway = c.sway * 3;
  let out = '';
  const blades = [-96, -72, -48, -24, 24, 48, 72, 96, -12, 14];
  blades.forEach((dx, i) => {
    const g = smooth(i * 0.03, 0.55 + i * 0.03, amt);
    if (g < 0.03) return;
    const L = (58 + (i % 3) * 14) * g;
    const bx = CX + dx * 0.12;
    const curve: Cubic = {
      p0: [bx, GROUND_Y + 3],
      p1: [bx + dx * 0.22, GROUND_Y - L * 0.4],
      p2: [bx + dx * 0.55 + sway, GROUND_Y - L * 0.72],
      p3: [bx + dx * 0.78 + sway, GROUND_Y - L * 0.86 + Math.abs(dx) * 0.12],
    };
    out += `<path d="${ribbonPath(curve, (t) => 3.1 * g * Math.sin(Math.PI * Math.pow(t, 0.6)) + 0.3, 8)}" fill="${fill}" stroke="${darken(c.pal.leafDeep, 0.15)}" stroke-width=".7" stroke-linejoin="round"/>`;
  });
  return out;
}

/** Opposite pairs of narrow leaves up the lower half of a stem. */
function stemLeaves(c: Ctx, curve: Cubic, scale: number): string {
  const amt = smooth(0.05, 1, c.s.leaf);
  if (amt < 0.04) return '';
  const dry = smooth(0.3, 1, c.s.wilt) * 0.35;
  const fill = dry > 0.04 ? mix(c.pal.leaf, '#a08c45', dry) : c.url('leaf');
  const stroke = darken(mix(c.pal.leafDeep, '#a08c45', dry), 0.2);
  let d = '';
  const pairs = 6;
  for (let i = 0; i < pairs; i++) {
    const t = 0.1 + (i / pairs) * 0.5;
    const reveal = smooth((i / pairs) * 0.7, (i / pairs) * 0.7 + 0.3, amt);
    if (reveal < 0.04) continue;
    const [x, y] = cubicAt(curve, t);
    const a = cubicAngle(curve, t);
    const len = (46 - i * 3.4) * scale * reveal;
    d += leafAt(x, y, a - 42, len, 3.4 * scale, 0.1, 0.8);
    d += leafAt(x, y, a + 42, len, 3.4 * scale, -0.1, 0.8, -1);
  }
  return d ? `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width=".6" stroke-linejoin="round"/>` : '';
}

/** The flower spike: whorls of small florets stacked up the tip of a stem. */
function spike(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.05) return '';
  const wilt = smooth(0, 1, st.wilt);
  const fruit = smooth(0.05, 1, st.fruit);
  const L = 128 * scale * (0.3 + 0.7 * bud);
  const shown = Math.max(1, Math.round(WHORLS * ramp(0.05, 0.85, st.bud)));
  const calyxCol = mix(mix(pal.leaf, '#9aa6c0', 0.35), '#8a7a52', Math.max(wilt * 0.7, fruit));
  const backCol = mix(mix(pal.petalDeep, pal.petal, 0.4), '#7a6a58', smooth(0.1, 0.9, wilt));
  const frontCol = mix(mix(pal.petal, pal.petalTip ?? lighten(pal.petal, 0.3), 0.3), '#a89a84', smooth(0.1, 0.9, wilt));
  const budCol = mix(pal.leaf, pal.petalDeep, 0.35);
  let calyx = '';
  let back = '';
  let front = '';
  let buds = '';
  for (let j = 0; j < shown; j++) {
    const t = j / (WHORLS - 1);
    // Whorls sit closer together towards the tip, like a real spike.
    const pos = 0.1 + 0.9 * Math.pow(t, 0.85);
    const wy = -L * pos;
    const sz = 15.5 * scale * (1 - 0.4 * Math.pow(t, 1.6)) * (0.55 + 0.45 * bud);
    const k = ramp(t * 0.6, t * 0.6 + 0.4, st.open);
    calyx += petalAt(0, wy + sz * 0.5, 0, 0, sz * 1.15, sz * 0.78, 0.2, 0.55);
    if (k < 0.04) {
      buds += petalAt(0, wy, 0, 0, sz * 0.8, sz * 0.62, 0.5, 0.5);
      continue;
    }
    // Petals fall from the bottom whorls first once the flower is spent.
    if (wilt > 0.3 && smooth(0.3, 1, wilt) > 1 - (1 - t) * 0.95 - 0.05) continue;
    const fl = sz * (0.6 + 0.4 * k);
    for (const side of [-1, 1]) {
      back += petalAt(side * fl * 0.3, wy + fl * 0.1, side * 40, 0, fl * 1.05, fl * 0.7, 0.3, 0.5);
      front += petalAt(side * fl * 0.2, wy - fl * 0.1, side * 15, 0, fl * 1.12, fl * 0.74, 0.3, 0.5);
    }
    front += petalAt(0, wy - fl * 0.2, 0, 0, fl * 1.05, fl * 0.74, 0.3, 0.5);
  }
  let g = `<path d="M0 0V${f(-L)}" stroke="${darken(pal.stem, 0.1)}" stroke-width="${f(2.6 * scale + 0.6)}" stroke-linecap="round" fill="none"/>`;
  g += `<path d="${calyx}" fill="${calyxCol}" stroke="${darken(calyxCol, 0.35)}" stroke-width=".6"/>`;
  if (buds) g += `<path d="${buds}" fill="${budCol}" stroke="${darken(budCol, 0.3)}" stroke-width=".5"/>`;
  if (back) g += `<path d="${back}" fill="${backCol}" stroke="${darken(backCol, 0.3)}" stroke-width=".55" stroke-opacity=".6"/>`;
  if (front) g += `<path d="${front}" fill="${frontCol}" stroke="${darken(frontCol, 0.3)}" stroke-width=".55" stroke-opacity=".6"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}

export const lavender: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    const { s } = c;
    let out = seed(s.seed) + roots(c, { depth: 100, spread: 130, laterals: 8 });
    if (s.stem <= 0.01) return out;
    const dry = smooth(0.2, 1, s.wilt);
    const stemColor = mix(c.pal.stem, '#8c7a3c', dry * 0.5);
    const sway = c.sway * 4 * ramp(0.2, 1, s.stem);
    const total = Math.max(0.0001, s.stem * (MAX_H + UNDER));

    interface Built {
      curve: Cubic;
      spec: StemSpec;
      grow: number;
    }
    const built: Built[] = [];
    STEMS.forEach((spec, i) => {
      // The first stem rises from the seed; the others fan out from the crown a little later.
      const grow = i === 0 ? 1 : smooth(0.25 + spec.delay, 0.8 + spec.delay * 0.5, s.stem);
      if (grow < 0.03) return;
      const x0 = CX + spec.bx * 0.35;
      const y0 = i === 0 ? SEED_Y : GROUND_Y + 4;
      const H = i === 0 ? total : (MAX_H * spec.h + 4) * grow * smooth(0.2, 1, s.stem);
      const lean = spec.lean * grow + sway * (0.4 + 0.1 * i);
      built.push({
        spec,
        grow,
        curve: {
          p0: [x0, y0],
          p1: [x0 + lean * 0.06, y0 - H * 0.38],
          p2: [x0 + lean * 0.42, y0 - H * 0.76],
          p3: [x0 + lean, y0 - H * (i === 0 ? spec.h : 1)],
        },
      });
    });

    const stemW = 4.4;
    out += clump(c);
    built.forEach(({ curve, grow }, i) => {
      out += stemStroke(curve, stemW * (i === 0 ? 1 : 0.8) * (0.6 + 0.4 * grow), stemColor);
    });
    built.forEach(({ curve, spec }) => {
      out += stemLeaves(c, curve, 0.75 + 0.25 * spec.h);
    });
    if (s.bud > 0.02) {
      built.forEach(({ curve, spec }) => {
        const [x, y] = cubicAt(curve, 1);
        const ang = cubicAngle(curve, 1) + 90;
        const sh = (v: number) => clamp01((v - spec.delay) / (1 - spec.delay));
        const local: LocalState = {
          bud: clamp01(ramp(spec.delay * 0.4, 1, s.bud)),
          open: sh(s.open),
          wilt: sh(s.wilt),
          fruit: sh(s.fruit),
        };
        out += spike(c, x, y, ang * 0.6, 0.75 + 0.25 * spec.h, local);
      });
    }
    if (s.wilt > 0.35) out += fallenPetals(c, smooth(0.35, 1, s.wilt) * 12, c.pal.petal, { spread: 150, size: 6, air: 0.15 });
    return out;
  },
};
