/** Đỗ quyên (azalea): small dark leaves and clusters of funnel flowers with five lobes, spotted throats and long curved stamens. */
import { CX, clamp01, darken, f, leafAt, lighten, linearGradient, mix, petalAt, smooth, type Ctx } from '../core';
import { SEED_Y, fallenPetals } from '../scene';
import { bushPlant, type LocalState } from './bush';
import type { ArchetypeRenderer } from './types';

function seed(k: number): string {
  if (k < 0.02) return '';
  let d = '';
  [[-9, 2, 20], [-2, -3, -30], [6, 1, 50], [10, 6, 0], [-5, 7, 70]].forEach(([x, y, r]) => (d += `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="1.4" transform="rotate(${r} ${x} ${y})"/>`));
  return `<g transform="translate(${CX} ${SEED_Y + 6})" opacity="${f(clamp01(k))}" fill="#6a4a2c" stroke="#2e1d0e" stroke-width=".5" aria-hidden="true">${d}</g>`;
}

function leaf(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const flip = Math.cos((angle * Math.PI) / 180) < 0 ? -1 : 1;
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  return `<path d="${leafAt(x, y, angle, 44 * scale, 15 * scale, 0.08, 0.62, flip)}" fill="${dry > 0.05 ? col : c.url('leaf')}" stroke="${darken(col, 0.4)}" stroke-width=".8" stroke-linejoin="round"/>`;
}

const CLUSTER = [
  { dx: 0, dy: -18, rot: 0, s: 1 },
  { dx: -34, dy: 4, rot: 24, s: 0.88 },
  { dx: 34, dy: 2, rot: -20, s: 0.9 },
  { dx: -14, dy: -48, rot: 40, s: 0.74 },
  { dx: 16, dy: -46, rot: -34, s: 0.72 },
];

function head(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.04) return '';
  const wilt = smooth(0, 1, st.wilt);
  const dry = '#a8806a';
  let g = '';
  CLUSTER.forEach((cl, i) => {
    const local = smooth(0, 1, Math.min(1, st.open * 1.4 - i * 0.1));
    if (wilt > 0.3 && smooth(0.3, 1, wilt) * 1.2 > 0.2 + i * 0.16) return;
    const R = 29 * scale * cl.s * (0.4 + 0.6 * bud);
    const cx = cl.dx * scale;
    const cy = cl.dy * scale;
    g += `<path d="M0 0Q${f(cx * 0.4)} ${f(cy * 0.55)} ${f(cx)} ${f(cy)}" fill="none" stroke="${mix(pal.leaf, '#8c7a3c', wilt * 0.5)}" stroke-width="2" stroke-linecap="round"/>`;
    if (local < 0.06) {
      const tint = mix(pal.leaf, pal.petal, smooth(0.3, 1, st.bud) * 0.75);
      g += `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(cl.rot)})"><path d="M0 0C${f(-R * 0.4)} ${f(-R * 0.3)} ${f(-R * 0.32)} ${f(-R * 0.9)} 0 ${f(-R * 1.1)}C${f(R * 0.32)} ${f(-R * 0.9)} ${f(R * 0.4)} ${f(-R * 0.3)} 0 0Z" fill="${tint}" stroke="${darken(tint, 0.35)}" stroke-width=".8"/></g>`;
      return;
    }
    const len = R * (0.55 + 0.45 * local);
    const col = mix(pal.petal, dry, smooth(0.1, 0.9, wilt));
    let petals = '';
    for (let k = 0; k < 5; k++) petals += petalAt(0, 0, k * 72, len * 0.1, len, len * 0.7, 0.1, 0.62);
    let spots = '';
    for (const [dx, dy] of [[-0.12, -0.5], [0.1, -0.56], [0, -0.42], [-0.06, -0.64], [0.14, -0.4]]) spots += `<circle cx="${f(dx! * len)}" cy="${f(dy! * len)}" r="${f(len * 0.035)}"/>`;
    let st5 = '';
    for (let k = 0; k < 5; k++) {
      const a = ((k - 2) * 15 * Math.PI) / 180;
      const ex = Math.sin(a) * len * 0.95;
      const ey = -Math.cos(a) * len * 0.95;
      st5 += `<path d="M0 0Q${f(ex * 0.3)} ${f(ey * 0.3 - 4)} ${f(ex)} ${f(ey)}" fill="none" stroke="${lighten(pal.petal, 0.55)}" stroke-width=".9"/><circle cx="${f(ex)}" cy="${f(ey)}" r="${f(len * 0.045)}" fill="${pal.centerDeep}"/>`;
    }
    g +=
      `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(cl.rot)})">` +
      `<path d="${petals}" fill="${col}" stroke="${darken(col, 0.3)}" stroke-width=".8" stroke-linejoin="round"/>` +
      `<circle r="${f(len * 0.16)}" fill="${mix(pal.petalDeep, dry, wilt * 0.7)}" opacity=".7"/>` +
      `<g fill="${pal.petalDeep}" opacity=".85">${spots}</g>${wilt < 0.6 ? st5 : ''}</g>`;
  });
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot * 0.4)})">${g}</g>`;
}

export const azalea: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        maxH: 236,
        stemW: 6.5,
        leavesPerStem: 11,
        leaf: { pairs: 1, length: 44, leafletLen: 36, leafletWid: 13, spread: 36 },
        leafFn: leaf,
        branches: [
          { at: 0.28, dx: -96, dy: -70, delay: 0.16, size: 0.94 },
          { at: 0.36, dx: 98, dy: -84, delay: 0.26, size: 0.9 },
          { at: 0.18, dx: -52, dy: -40, delay: 0.4, size: 0.78 },
          { at: 0.2, dx: 54, dy: -46, delay: 0.5, size: 0.74 },
        ],
        head,
      }) +
      (c.s.wilt > 0.3 ? fallenPetals(c, smooth(0.3, 1, c.s.wilt) * 10, c.pal.petal, { spread: 170, size: 13, air: 0.25 }) : '')
    );
  },
};
