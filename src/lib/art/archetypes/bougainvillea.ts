import {
  cubicAt,
  darken,
  dotsPath,
  f,
  leafAt,
  linearGradient,
  mix,
  petalAt,
  smooth,
  type Ctx,
  type Cubic,
} from '../core';
import { fallenPetals } from '../scene';
import { bushPlant, type LocalState } from './bush';
import { cuttingInSoil } from './cutting';
import type { ArchetypeRenderer } from './types';

function leaf(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const L = 46 * scale;
  const a = (angle * Math.PI) / 180;
  const flip = Math.cos(a) < 0 ? -1 : 1;
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  return `<path d="${leafAt(x, y, angle, L, 20 * scale, 0.12, 0.9, flip)}" fill="${dry > 0.05 ? col : c.url('leaf')}" stroke="${darken(col, 0.4)}" stroke-width=".8" stroke-linejoin="round"/>`;
}

/** Small curved thorns along the main stem. */
function thorns(c: Ctx, curve: Cubic, color: string): string {
  if (c.s.stem < 0.2) return '';
  let d = '';
  for (let i = 0; i < 10; i++) {
    const t = 0.2 + i * 0.07;
    if (t > 0.92) break;
    const [x, y] = cubicAt(curve, t);
    const side = i % 2 === 0 ? 1 : -1;
    d += `M${f(x + side * 3)} ${f(y + 2)}Q${f(x + side * 8)} ${f(y - 1)} ${f(x + side * 11)} ${f(y - 7)}Q${f(x + side * 6)} ${f(y - 5)} ${f(x + side * 2.5)} ${f(y - 3)}Z`;
  }
  return `<path d="${d}" fill="${mix(color, '#6a3a2a', 0.5)}" stroke="${darken(color, 0.4)}" stroke-width=".5"/>`;
}

/** Layout of the flower clusters at one stem tip, in px at scale 1. */
const CLUSTER = [
  { dx: 0, dy: -16, rot: 10, s: 1 },
  { dx: -26, dy: 4, rot: 48, s: 0.86 },
  { dx: 25, dy: 2, rot: -30, s: 0.9 },
  { dx: -10, dy: -40, rot: 80, s: 0.8 },
  { dx: 14, dy: -38, rot: -62, s: 0.76 },
];

/**
 * A bougainvillea head: each "flower" is three papery bracts wrapped around three tiny white
 * tubular flowers. The colour sits in the bracts, which is why it lasts so long.
 */
function bougainvilleaHead(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.04) return '';
  const wilt = smooth(0, 1, st.wilt);
  const green = mix(pal.leaf, pal.petal, smooth(0.35, 1, st.bud) * 0.7);
  const dry = '#c9a98a';
  let bracts = '';
  const tubes: { x: number; y: number; r: number }[] = [];
  CLUSTER.forEach((cl, i) => {
    // Clusters at the edge of the head open (and dry) a little later than the middle one.
    const local = smooth(0, 1, Math.min(1, st.open * 1.4 - i * 0.08));
    const gone = wilt > 0.55 && smooth(0.55, 1, wilt) * 1.2 > 0.25 + i * 0.18;
    if (gone) return;
    const L = 33 * scale * cl.s * (0.34 + 0.66 * bud) * (0.55 + 0.45 * local) * (1 - 0.18 * wilt);
    const W = L * (0.5 + 0.55 * local);
    const col = local < 0.05 ? green : mix(mix(pal.petalDeep, pal.petal, 0.35 + 0.4 * local), dry, smooth(0.05, 0.9, wilt));
    const cx = cl.dx * scale;
    const cy = cl.dy * scale;
    let d = '';
    for (let k = 0; k < 3; k++) d += petalAt(cx, cy, cl.rot + k * 120, L * 0.06, L, W, 0.55, 0.6);
    bracts += `<path d="${d}" fill="${col}" stroke="${darken(col, 0.3)}" stroke-width=".7" stroke-linejoin="round"/>`;
    if (local > 0.3) {
      for (let k = 0; k < 3; k++) {
        const a = ((cl.rot + k * 120 + 60) * Math.PI) / 180;
        tubes.push({ x: cx + Math.sin(a) * L * 0.2, y: cy - Math.cos(a) * L * 0.2, r: 1.6 * scale * cl.s });
      }
    }
  });
  const tube = tubes.length ? `<path d="${dotsPath(tubes)}" fill="#fbf3dc" stroke="#9a8a60" stroke-width=".4"/>` : '';
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot * 0.6)})">${bracts}${tube}</g>`;
}

export const bougainvillea: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      cuttingInSoil(c.s.seed, { len: 52, width: 11, bark: '#8a6a45', nodes: 2 }) +
      bushPlant(c, {
        maxH: 292,
        stemW: 6,
        leavesPerStem: 10,
        leaf: { pairs: 1, length: 46, leafletLen: 36, leafletWid: 16, spread: 40 },
        leafFn: leaf,
        decor: thorns,
        // Long, arching stems that carry a cluster at every tip.
        branches: [
          { at: 0.22, dx: -122, dy: -92, delay: 0.16, size: 0.92 },
          { at: 0.34, dx: 120, dy: -108, delay: 0.3, size: 0.88 },
          { at: 0.5, dx: -70, dy: -76, delay: 0.44, size: 0.76 },
          { at: 0.12, dx: 76, dy: -52, delay: 0.56, size: 0.62 },
        ],
        head: bougainvilleaHead,
      }) +
      (c.s.wilt > 0.3 ? fallenPetals(c, smooth(0.3, 1, c.s.wilt) * 14, mix(c.pal.petal, '#c9a98a', 0.5), { spread: 190, size: 11, air: 0.3 }) : '')
    );
  },
};
