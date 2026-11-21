/** Hoa nhài (Arabian jasmine): glossy ovate leaves in pairs and clusters of small white pinwheel flowers on slim tubes. */
import { darken, f, leafAt, linearGradient, mix, petalAt, smooth, type Ctx } from '../core';
import { fallenPetals } from '../scene';
import { bushPlant, type LocalState } from './bush';
import { cuttingInSoil } from './cutting';
import type { ArchetypeRenderer } from './types';

function leaf(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const L = 46 * scale;
  const flip = Math.cos((angle * Math.PI) / 180) < 0 ? -1 : 1;
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  const a = (angle * Math.PI) / 180;
  return (
    `<path d="${leafAt(x, y, angle, L, 18 * scale, 0.06, 0.7, flip)}" fill="${dry > 0.05 ? col : c.url('leaf')}" stroke="${darken(col, 0.4)}" stroke-width=".8" stroke-linejoin="round"/>` +
    `<path d="M${f(x)} ${f(y)}L${f(x + Math.cos(a) * L * 0.9)} ${f(y + Math.sin(a) * L * 0.9)}" stroke="${darken(col, 0.2)}" stroke-width=".7" opacity=".6"/>`
  );
}

const CLUSTER = [
  { dx: 0, dy: -16, rot: 8, s: 1 },
  { dx: -26, dy: 2, rot: 30, s: 0.86 },
  { dx: 26, dy: 0, rot: -24, s: 0.88 },
  { dx: -10, dy: -40, rot: 44, s: 0.74 },
  { dx: 14, dy: -38, rot: -40, s: 0.72 },
];

function head(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.04) return '';
  const wilt = smooth(0, 1, st.wilt);
  const dry = '#cdb878';
  let g = '';
  CLUSTER.forEach((cl, i) => {
    const local = smooth(0, 1, Math.min(1, st.open * 1.4 - i * 0.1));
    if (wilt > 0.3 && smooth(0.3, 1, wilt) * 1.25 > 0.2 + i * 0.16) return;
    const R = 25 * scale * cl.s * (0.4 + 0.6 * bud);
    const cx = cl.dx * scale;
    const cy = cl.dy * scale;
    g += `<path d="M0 0Q${f(cx * 0.4)} ${f(cy * 0.55)} ${f(cx)} ${f(cy)}" fill="none" stroke="${mix(pal.leaf, '#8c7a3c', wilt * 0.5)}" stroke-width="1.8" stroke-linecap="round"/>`;
    if (local < 0.08) {
      // A slim, pointed bud tinted with the first hint of white.
      const tint = mix(pal.leaf, pal.petal, smooth(0.35, 1, st.bud) * 0.85);
      g += `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(cl.rot)})"><path d="M0 0C${f(-R * 0.2)} ${f(-R * 0.3)} ${f(-R * 0.18)} ${f(-R * 0.8)} 0 ${f(-R * 1.1)}C${f(R * 0.18)} ${f(-R * 0.8)} ${f(R * 0.2)} ${f(-R * 0.3)} 0 0Z" fill="${tint}" stroke="${darken(tint, 0.3)}" stroke-width=".7"/></g>`;
      return;
    }
    const col = mix(pal.petal, dry, smooth(0.05, 0.9, wilt));
    let petals = '';
    for (let k = 0; k < 8; k++) petals += petalAt(0, 0, k * 45 + 10, R * 0.1, R * 0.9 * (0.5 + 0.5 * local), R * 0.36, 0.1, 0.6);
    g +=
      `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(cl.rot)})">` +
      `<path d="${petals}" fill="${col}" stroke="${darken(pal.petalDeep, 0.1)}" stroke-width=".7" stroke-linejoin="round" stroke-opacity=".7"/>` +
      `<circle r="${f(R * 0.14)}" fill="${mix(pal.center, '#a8832a', wilt * 0.7)}" stroke="${pal.centerDeep}" stroke-width=".5"/>` +
      `</g>`;
  });
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot * 0.4)})">${g}</g>`;
}

export const jasmine: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      cuttingInSoil(c.s.seed, { len: 50, width: 8, bark: '#8a7a52', nodes: 2 }) +
      bushPlant(c, {
        maxH: 250,
        stemW: 5,
        leavesPerStem: 12,
        leaf: { pairs: 1, length: 46, leafletLen: 36, leafletWid: 14, spread: 36 },
        leafFn: leaf,
        branches: [
          { at: 0.26, dx: -100, dy: -74, delay: 0.16, size: 0.94 },
          { at: 0.34, dx: 102, dy: -86, delay: 0.26, size: 0.9 },
          { at: 0.18, dx: -58, dy: -40, delay: 0.4, size: 0.78 },
          { at: 0.2, dx: 60, dy: -48, delay: 0.5, size: 0.74 },
        ],
        head,
      }) +
      (c.s.wilt > 0.3 ? fallenPetals(c, smooth(0.3, 1, c.s.wilt) * 12, c.pal.petal, { spread: 170, size: 9, air: 0.3 }) : '')
    );
  },
};
