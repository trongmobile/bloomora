/** Hoa mười giờ (moss rose): a low, spreading succulent with fat little leaves and silky, rose-like cups. */
import { CX, clamp01, darken, f, leafAt, linearGradient, lighten, mix, petalAt, smooth, type Ctx } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant, type LocalState } from './bush';
import type { ArchetypeRenderer } from './types';

function seed(k: number): string {
  if (k < 0.02) return '';
  const one = (x: number, y: number, r: number) =>
    `<ellipse cx="${x}" cy="${y}" rx="3.6" ry="2.8" transform="rotate(${r} ${x} ${y})" fill="#1c1814" stroke="#000" stroke-width=".6"/><path d="M${x - 2} ${y - 1}Q${x} ${y - 2} ${x + 2} ${y - 0.5}" stroke="#7a6a58" stroke-width=".7" fill="none" opacity=".6"/>`;
  return `<g transform="translate(${CX} ${SEED_Y + 6})" opacity="${f(clamp01(k))}" aria-hidden="true">${one(-8, 2, 20)}${one(0, -1, -10)}${one(8, 3, 40)}${one(2, 7, 0)}</g>`;
}

/** Plump, almost cylindrical leaf. */
function leaf(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  const flip = Math.cos((angle * Math.PI) / 180) < 0 ? -1 : 1;
  return `<path d="${leafAt(x, y, angle, 34 * scale, 7.5 * scale, 0.04, 0.6, flip)}" fill="${dry > 0.05 ? col : lighten(c.pal.leaf, 0.12)}" stroke="${darken(col, 0.35)}" stroke-width=".8" stroke-linejoin="round"/>`;
}

function head(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.04) return '';
  const open = smooth(0, 1, st.open);
  const wilt = smooth(0, 1, st.wilt);
  const R = 44 * scale * (0.34 + 0.66 * bud);
  const sepal = mix(pal.leaf, '#8c7a3c', wilt * 0.6);
  let g = `<path d="M${f(-R * 0.34)} 2Q0 ${f(R * 0.5)} ${f(R * 0.34)} 2Q0 ${f(-R * 0.1)} ${f(-R * 0.34)} 2Z" fill="${sepal}" stroke="${darken(sepal, 0.35)}" stroke-width=".8"/>`;
  if (open < 0.06) {
    const tint = mix(pal.leaf, pal.petal, smooth(0.3, 1, st.bud) * 0.8);
    g += `<ellipse cx="0" cy="${f(-R * 0.3)}" rx="${f(R * 0.3)}" ry="${f(R * 0.42)}" fill="${tint}" stroke="${darken(tint, 0.3)}" stroke-width=".8"/>`;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot * 0.4)})">${g}</g>`;
  }
  const dry = '#9a7a6a';
  const fade = (col: string) => mix(col, dry, smooth(0.1, 0.9, wilt));
  const layers = [
    { n: 5, k: 1, off: 0, col: pal.petalDeep },
    { n: 5, k: 0.78, off: 36, col: pal.petal },
    { n: 5, k: 0.54, off: 18, col: pal.petalTip ?? lighten(pal.petal, 0.25) },
  ];
  for (const L of layers) {
    let d = '';
    for (let i = 0; i < L.n; i++) d += petalAt(0, -R * 0.2, (i * 360) / L.n + L.off, R * 0.04, R * L.k * open * (1 - 0.55 * wilt), R * 0.66, 0.08, 0.62);
    const col = fade(L.col);
    g += `<path d="${d}" fill="${col}" stroke="${darken(col, 0.3)}" stroke-width=".7" stroke-linejoin="round" stroke-opacity=".6"/>`;
  }
  // A ring of golden stamens.
  let s = '';
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    s += `<circle cx="${f(Math.cos(a) * R * 0.16 * open)}" cy="${f(-R * 0.2 + Math.sin(a) * R * 0.16 * open)}" r="${f(Math.max(0.6, R * 0.035))}"/>`;
  }
  g += `<g fill="${mix(pal.center, '#8a6a22', wilt * 0.7)}" stroke="${pal.centerDeep}" stroke-width=".3">${s}</g>`;
  // Small round capsule once the petals are gone.
  if (st.fruit > 0.05) g += `<ellipse cx="0" cy="${f(-R * 0.22)}" rx="${f(R * 0.2)}" ry="${f(R * 0.24)}" fill="#a39662" stroke="#4a3f22" stroke-width=".8"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot * 0.4)})">${g}</g>`;
}

export const mooseRose: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        // Low and sprawling: many short branches spreading sideways.
        maxH: 138,
        stemW: 4.2,
        leavesPerStem: 7,
        leaf: { pairs: 1, length: 34, leafletLen: 30, leafletWid: 8, spread: 30 },
        leafFn: leaf,
        branches: [
          { at: 0.16, dx: -112, dy: -34, delay: 0.14, size: 0.94 },
          { at: 0.2, dx: 110, dy: -44, delay: 0.2, size: 0.92 },
          { at: 0.1, dx: -62, dy: -26, delay: 0.32, size: 0.84 },
          { at: 0.12, dx: 64, dy: -30, delay: 0.4, size: 0.82 },
          { at: 0.08, dx: -158, dy: -10, delay: 0.52, size: 0.7 },
          { at: 0.1, dx: 156, dy: -16, delay: 0.6, size: 0.68 },
        ],
        head,
      })
    );
  },
};
