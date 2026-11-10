import {
  CX,
  GROUND_Y,
  clamp01,
  cubicAngle,
  cubicAt,
  darken,
  dotsPath,
  f,
  lighten,
  linearGradient,
  mix,
  mulberry32,
  petalAt,
  ramp,
  smooth,
  type Ctx,
  type Cubic,
} from '../core';
import { SEED_Y, fallenPetals, roots, stemStroke } from '../scene';
import { pinnateLeaf, type LeafParams } from './bush';
import type { ArchetypeRenderer } from './types';

const TRUNK_H = 150;
const UNDER = SEED_Y - GROUND_Y;

/** Feathery, finely divided leaf (a compound leaf whose leaflets are themselves tiny). */
const FROND: LeafParams = { pairs: 11, length: 74, leafletLen: 17, leafletWid: 3.4, spread: 74 };

/** A flame-tree seed: a hard, oblong, mottled brown seed with a darker stripe. */
function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(-16)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<path d="M-5 -19C4 -19 8 -9 8 1C8 12 3 19 -2 19C-8 19 -9 8 -9 -2C-9 -12 -8 -19 -5 -19Z" fill="#8b6a3b" stroke="#3d2a12" stroke-width="1.2"/>` +
    `<path d="M-1 -15C1 -6 1 6 -1 15" fill="none" stroke="#4a3418" stroke-width="2" opacity=".65"/>` +
    `<path d="M-6 -6L-4 -3M5 4L3 7M-5 8L-3 11M4 -9L2 -6" stroke="#5a4020" stroke-width="1" opacity=".5"/>` +
    `</g>`
  );
}

/** Primary branches that fan out from the top of the trunk into an umbrella crown. */
const BRANCHES = [
  { dx: -168, dy: -76, at: 0 },
  { dx: 170, dy: -84, at: 0.02 },
  { dx: -92, dy: -122, at: 0.04 },
  { dx: 96, dy: -128, at: 0.06 },
  { dx: 2, dy: -138, at: 0.08 },
];

/** Flower clusters sit near the end of each branch (t along the branch). */
const CLUSTER_AT = [1, 0.74, 0.5];

interface Flower {
  x: number;
  y: number;
  sc: number;
  rot: number;
  delay: number;
}

function flowerPaths(c: Ctx, flowers: Flower[]): string {
  const { s, pal } = c;
  const wilt = smooth(0, 1, s.wilt);
  let petals = '';
  let standard = '';
  let blotch = '';
  let stamens = '';
  const budDots: { x: number; y: number; r: number }[] = [];
  const anthers: { x: number; y: number; r: number }[] = [];
  for (const fl of flowers) {
    const local = clamp01(s.open * 1.45 - fl.delay * 0.45);
    const gone = wilt > 0.1 && smooth(0.1, 0.95, wilt) * 1.15 > fl.delay * 0.9 + 0.05;
    if (gone) continue;
    if (local < 0.18) {
      budDots.push({ x: fl.x, y: fl.y, r: (1.6 + 3.8 * ramp(0.1, 1, s.bud)) * fl.sc });
      continue;
    }
    const k = (0.45 + 0.75 * local) * fl.sc * (1 - 0.3 * wilt);
    const R = 20 * k;
    // Four spreading petals, then one larger upright "standard" petal.
    for (const a of [-72, 72, -144, 144]) {
      petals += petalAt(fl.x, fl.y, a + fl.rot, R * 0.1, R, R * 0.74, 0.1, 0.55);
    }
    standard += petalAt(fl.x, fl.y, fl.rot, R * 0.1, R * 1.12, R * 0.8, 0.1, 0.55);
    blotch += petalAt(fl.x, fl.y, fl.rot, R * 0.2, R * 0.8, R * 0.26, 0.5, 0.5);
    const a = ((fl.rot + 28) * Math.PI) / 180;
    const ex = fl.x + Math.sin(a) * R * 1.35;
    const ey = fl.y - Math.cos(a) * R * 1.35;
    stamens += `M${f(fl.x)} ${f(fl.y)}Q${f((fl.x + ex) / 2 + R * 0.35)} ${f((fl.y + ey) / 2)} ${f(ex)} ${f(ey)}`;
    anthers.push({ x: ex, y: ey, r: 1.5 * fl.sc });
  }
  let out = '';
  if (budDots.length) {
    const budCol = mix(pal.petalDeep, '#5a1a1a', 0.35);
    out += `<path d="${dotsPath(budDots)}" fill="${budCol}" stroke="${darken(budCol, 0.35)}" stroke-width=".6"/>`;
  }
  if (petals) {
    out += `<path d="${petals}" fill="${mix(pal.petal, '#8a4a40', wilt * 0.5)}" stroke="${darken(pal.petalDeep, 0.3)}" stroke-width=".6" stroke-linejoin="round"/>`;
    out += `<path d="${standard}" fill="${mix(mix(pal.petal, pal.petalDeep, 0.35), '#8a6a50', wilt * 0.5)}" stroke="${darken(pal.petalDeep, 0.3)}" stroke-width=".6" stroke-linejoin="round"/>`;
    // The upright petal carries a pale, streaked blotch.
    out += `<path d="${blotch}" fill="${mix(pal.petalTip ?? lighten(pal.petal, 0.5), '#8a6a50', wilt * 0.5)}" opacity=".9"/>`;
    out += `<path d="${stamens}" fill="none" stroke="${pal.petalDeep}" stroke-width=".9" stroke-linecap="round"/>`;
    out += `<path d="${dotsPath(anthers)}" fill="${pal.center}" stroke="${pal.centerDeep}" stroke-width=".4"/>`;
  }
  return out;
}

/** Long, flat, woody pods that hang from the branches once the petals have fallen. */
function pods(branches: { curve: Cubic; k: number }[], fruit: number): string {
  const m = smooth(0.25, 1, fruit);
  if (m < 0.04) return '';
  let d = '';
  branches.forEach(({ curve, k }, bi) => {
    if (k < 0.5) return;
    for (let j = 0; j < 2; j++) {
      const [x, y] = cubicAt(curve, 0.7 + j * 0.2 - (bi % 2) * 0.06);
      const len = (62 + ((bi * 13 + j * 17) % 18)) * m;
      const sway = (bi % 2 === 0 ? 1 : -1) * 5;
      d += `M${f(x)} ${f(y)}C${f(x + sway)} ${f(y + len * 0.3)} ${f(x + sway * 1.6)} ${f(y + len * 0.7)} ${f(x + sway)} ${f(y + len)}`;
    }
  });
  return (
    `<path d="${d}" fill="none" stroke="#2e1d12" stroke-width="7.6" stroke-linecap="round"/>` +
    `<path d="${d}" fill="none" stroke="#6b4a2c" stroke-width="5.4" stroke-linecap="round"/>`
  );
}

export const flameTree: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    const { s, pal } = c;
    let out = roots(c, { depth: 92, spread: 150, laterals: 8 }) + seed(s.seed);
    if (s.stem < 0.01) return out;
    const total = Math.max(0.0001, s.stem * (TRUNK_H + UNDER));
    const sway = c.sway * 4 * ramp(0.2, 1, s.stem);
    const top: [number, number] = [CX + sway, SEED_Y - total];
    const trunk: Cubic = {
      p0: [CX, SEED_Y],
      p1: [CX + 3, SEED_Y - total * 0.38],
      p2: [CX - 6 + sway * 0.5, SEED_Y - total * 0.72],
      p3: top,
    };
    const dry = smooth(0.4, 1, s.wilt) * 0.35;
    const bark = '#6a5240';
    const leafAmt = smooth(0, 1, s.leaf);
    const rnd = mulberry32(77);

    // Crown branches appear once the trunk has reached most of its height.
    const crown = smooth(0.4, 0.98, s.stem);
    const branches: { curve: Cubic; k: number }[] = [];
    BRANCHES.forEach((b) => {
      const k = smooth(0.4 + b.at, 0.98, s.stem);
      if (k < 0.03) return;
      branches.push({
        k,
        curve: {
          p0: top,
          p1: [top[0] + b.dx * 0.1 * k, top[1] + b.dy * 0.55 * k],
          p2: [top[0] + b.dx * 0.55 * k, top[1] + b.dy * 0.98 * k],
          p3: [top[0] + b.dx * k + sway * 0.5, top[1] + b.dy * k],
        },
      });
    });

    out += stemStroke(trunk, 5 + 15 * Math.pow(smooth(0, 1, s.stem), 0.85), bark);
    branches.forEach(({ curve, k }) => {
      out += stemStroke(curve, (3 + 5 * k) * (0.6 + 0.4 * crown), bark);
    });

    // Leaves: a few on the young stem, then a feathery crown along every branch.
    let rachis = '';
    let blades = '';
    const addLeaf = (x: number, y: number, ang: number, sc: number) => {
      const res = pinnateLeaf(x, y, ang, sc, FROND, 0.35 + dry);
      rachis += res.rachis;
      blades += res.d;
    };
    if (leafAmt > 0.03) {
      const young = 1 - smooth(0.4, 0.9, s.stem);
      for (let i = 0; i < 6; i++) {
        const reveal = smooth((i / 6) * 0.7, (i / 6) * 0.7 + 0.3, leafAmt) * (0.35 + 0.65 * (1 - young * 0.6));
        if (reveal < 0.04) continue;
        const [x, y] = cubicAt(trunk, 0.5 + (i / 6) * 0.48);
        const side = i % 2 === 0 ? 1 : -1;
        addLeaf(x, y, side > 0 ? -30 : 210, (0.55 + 0.3 * (1 - i / 7)) * reveal * (0.6 + 0.4 * young));
      }
      branches.forEach(({ curve, k }, bi) => {
        for (let j = 0; j < 5; j++) {
          const reveal = smooth((j / 5) * 0.7, (j / 5) * 0.7 + 0.3, leafAmt) * k;
          if (reveal < 0.04) continue;
          const t = 0.3 + j * 0.17;
          const [x, y] = cubicAt(curve, Math.min(t, 1));
          const base = cubicAngle(curve, Math.min(t, 1));
          const side = (j + bi) % 2 === 0 ? 1 : -1;
          addLeaf(x, y, base + side * (38 + rnd() * 18), (0.62 + 0.3 * rnd()) * reveal);
        }
        const [tx, ty] = cubicAt(curve, 1);
        addLeaf(tx, ty, cubicAngle(curve, 1) - 6, 0.7 * smooth(0, 1, leafAmt) * k);
      });
    }
    if (blades) {
      const col = mix(pal.leaf, '#a08c45', dry * 1.4);
      out += `<path d="${rachis}" fill="none" stroke="${darken(col, 0.2)}" stroke-width="1.3" stroke-linecap="round"/>`;
      out += `<path d="${blades}" fill="${dry > 0.02 ? col : c.url('leaf')}" stroke="${darken(col, 0.38)}" stroke-width=".5" stroke-linejoin="round"/>`;
    }

    // Flowers: dense scarlet clusters near the ends of the branches.
    if (s.bud > 0.02 && s.stem > 0.9) {
      const flowers: Flower[] = [];
      branches.forEach(({ curve, k }) => {
        if (k < 0.7) return;
        CLUSTER_AT.forEach((t, ti) => {
          const [bx, by] = cubicAt(curve, t);
          const n = ti === 0 ? 7 : 5;
          for (let i = 0; i < n; i++) {
            flowers.push({
              x: bx + (rnd() - 0.5) * 50,
              y: by + (rnd() - 0.65) * 32,
              sc: 0.8 + rnd() * 0.45,
              rot: (rnd() - 0.5) * 70,
              delay: rnd(),
            });
          }
        });
      });
      out += flowerPaths(c, flowers);
      if (s.fruit > 0.25 && s.wilt > 0.4) out += pods(branches, s.fruit);
    }
    if (s.wilt > 0.12) out += fallenPetals(c, smooth(0.12, 1, s.wilt) * 40, pal.petal, { spread: 230, size: 10, air: 0.5 });
    return out;
  },
};
