import {
  darken,
  f,
  leafAt,
  lighten,
  linearGradient,
  mix,
  smooth,
  type Ctx,
} from '../core';
import { fallenPetals } from '../scene';
import { bushPlant, type LocalState } from './bush';
import { cuttingInSoil } from './cutting';
import type { ArchetypeRenderer } from './types';

/** Long, glossy, oblong leaf with a pointed tip and a pale midrib. */
function leaf(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const L = 96 * scale;
  const a = (angle * Math.PI) / 180;
  const flip = Math.cos(a) < 0 ? -1 : 1;
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  const bend = 0.12;
  const tipX = x + Math.cos(a) * L - bend * L * flip * Math.sin(a);
  const tipY = y + Math.sin(a) * L + bend * L * flip * Math.cos(a);
  return (
    `<path d="${leafAt(x, y, angle, L, 15 * scale, bend, 0.9, flip)}" fill="${dry > 0.05 ? col : c.url('leaf')}" stroke="${darken(col, 0.4)}" stroke-width=".8" stroke-linejoin="round"/>` +
    `<path d="M${f(x)} ${f(y)}L${f(tipX)} ${f(tipY)}" stroke="${lighten(col, 0.4)}" stroke-width="1" stroke-linecap="round" opacity=".7"/>`
  );
}

/** One petal, pointing up, with its tip leaning to one side so five of them make a pinwheel. */
function twisted(len: number, wid: number): string {
  const w = wid;
  return (
    `M0 0C${f(-w * 0.25)} ${f(-len * 0.25)} ${f(-w * 0.9)} ${f(-len * 0.6)} ${f(-w * 0.55)} ${f(-len * 0.92)}` +
    `C${f(-w * 0.3)} ${f(-len * 1.08)} ${f(w * 0.5)} ${f(-len * 1.05)} ${f(w * 0.78)} ${f(-len * 0.7)}` +
    `C${f(w * 1)} ${f(-len * 0.36)} ${f(w * 0.5)} ${f(-len * 0.1)} 0 0Z`
  );
}

/** Where each flower of a cluster sits, in px at scale 1. */
const CLUSTER = [
  { dx: 0, dy: -30, rot: 8, s: 1 },
  { dx: -34, dy: -10, rot: 40, s: 0.86 },
  { dx: 34, dy: -12, rot: -26, s: 0.9 },
  { dx: -12, dy: -62, rot: 64, s: 0.78 },
  { dx: 20, dy: -58, rot: -50, s: 0.74 },
];

function plumeriaHead(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.04) return '';
  const wilt = smooth(0, 1, st.wilt);
  const stalk = mix(pal.leaf, '#8c7a3c', wilt * 0.6);
  let g = '';
  CLUSTER.forEach((cl, i) => {
    const local = smooth(0, 1, Math.min(1, st.open * 1.4 - i * 0.1));
    const gone = wilt > 0.3 && smooth(0.3, 1, wilt) * 1.2 > 0.2 + i * 0.16;
    if (gone) return;
    const R = 31 * scale * cl.s * (0.4 + 0.6 * bud);
    const cx = cl.dx * scale;
    const cy = cl.dy * scale;
    g += `<path d="M0 0Q${f(cx * 0.4)} ${f(cy * 0.55)} ${f(cx)} ${f(cy)}" fill="none" stroke="${stalk}" stroke-width="2.2" stroke-linecap="round"/>`;
    if (local < 0.06) {
      // Bud: a slim, twisted cone with pink stripes.
      const tint = mix(pal.leaf, pal.petal, smooth(0.3, 1, st.bud) * 0.7);
      g +=
        `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(cl.rot)})">` +
        `<path d="M0 0C${f(-R * 0.34)} ${f(-R * 0.3)} ${f(-R * 0.26)} ${f(-R * 0.9)} ${f(R * 0.06)} ${f(-R * 1.15)}C${f(R * 0.3)} ${f(-R * 0.8)} ${f(R * 0.3)} ${f(-R * 0.3)} 0 0Z" fill="${tint}" stroke="${darken(tint, 0.35)}" stroke-width=".8"/>` +
        `<path d="M${f(-R * 0.1)} ${f(-R * 0.1)}Q${f(R * 0.18)} ${f(-R * 0.6)} ${f(R * 0.06)} ${f(-R * 1.1)}" fill="none" stroke="${darken(tint, 0.25)}" stroke-width=".8" opacity=".6"/>` +
        `</g>`;
      return;
    }
    const len = R * (0.5 + 0.5 * local) * (1 - 0.35 * wilt);
    const wid = R * 0.58 * (0.75 + 0.25 * local);
    const fillTop = mix(pal.petal, '#b89a72', smooth(0.1, 0.9, wilt));
    let petals = '';
    for (let k = 0; k < 5; k++) {
      petals += `<path transform="rotate(${f(k * 72)})" d="${twisted(len, wid)}" fill="${c.url('plPetal')}" stroke="${wilt > 0.1 ? darken(fillTop, 0.3) : pal.petalDeep}" stroke-width=".8" stroke-linejoin="round" stroke-opacity=".7"/>`;
    }
    g += `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(cl.rot)})">${petals}<circle r="${f(R * 0.1)}" fill="${pal.centerDeep}" opacity=".55"/></g>`;
  });
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot * 0.4)})">${g}</g>`;
}

export const plumeria: ArchetypeRenderer = {
  defs(c) {
    const p = c.pal;
    return (
      linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0) +
      // Petals fade from a yellow throat to white (or the petal colour) at the tip.
      linearGradient(
        c.id('plPetal'),
        [
          [0, p.center],
          [0.3, mix(p.center, p.petal, 0.55)],
          [0.62, p.petal],
          [1, p.petalTip ?? lighten(p.petal, 0.2)],
        ],
        0,
        1,
        0,
        0,
      )
    );
  },
  plant(c) {
    return (
      cuttingInSoil(c.s.seed, { len: 58, width: 18, bark: '#a39a78', nodes: 1 }) +
      bushPlant(c, {
        // Thick, fleshy, sparsely branched stems; big leaves; a flower cluster at each tip.
        maxH: 262,
        stemW: 15,
        leavesPerStem: 4,
        leaf: { pairs: 1, length: 96, leafletLen: 80, leafletWid: 14, spread: 20 },
        leafFn: leaf,
        branches: [
          { at: 0.42, dx: -88, dy: -90, delay: 0.2, size: 0.86 },
          { at: 0.52, dx: 90, dy: -78, delay: 0.34, size: 0.8 },
        ],
        head: plumeriaHead,
      }) +
      (c.s.wilt > 0.3 ? fallenPetals(c, smooth(0.3, 1, c.s.wilt) * 9, c.pal.petal, { spread: 170, size: 15, air: 0.2 }) : '')
    );
  },
};
