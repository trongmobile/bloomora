import { CX, clamp01, darken, f, leafAt, lighten, linearGradient, mix, petalAt, smooth, type Ctx } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant, type LocalState } from './bush';
import type { ArchetypeRenderer } from './types';

function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(30)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<ellipse rx="4" ry="6.5" fill="#c9a86a" stroke="#5a4220" stroke-width="1"/>` +
    `<path d="M0 -5V5" stroke="#8a6a38" stroke-width=".8" opacity=".6"/>` +
    `</g>`
  );
}

/** A rounded, scalloped leaf on a short stalk. */
function leaf(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  const len = 54 * scale;
  return (
    `<path d="${leafAt(x, y, angle, len, 24 * scale, 0.12, 0.1)}" fill="${dry > 0.05 ? col : c.url('leaf')}" stroke="${darken(col, 0.38)}" stroke-width=".8" stroke-linejoin="round"/>` +
    `<path d="M${f(x)} ${f(y)}L${f(x + Math.cos((angle * Math.PI) / 180) * len * 0.8)} ${f(y + Math.sin((angle * Math.PI) / 180) * len * 0.8)}" stroke="${darken(col, 0.3)}" stroke-width=".8" opacity=".6"/>`
  );
}

/** A five-petalled face: two upper petals, two side petals, one broad lower petal. */
function face(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.04) return '';
  const open = smooth(0, 1, st.open);
  const wilt = smooth(0, 1, st.wilt);
  const calyx = mix(pal.leaf, '#8c7a3c', wilt * 0.6);
  const R = 42 * scale;
  let g = '';
  if (open < 0.06) {
    const s = 0.4 + 0.6 * bud;
    g += `<path d="M0 6C${f(-9 * s * scale)} 0 ${f(-9 * s * scale)} ${f(-16 * s * scale)} 0 ${f(-22 * s * scale)}C${f(9 * s * scale)} ${f(-16 * s * scale)} ${f(9 * s * scale)} 0 0 6Z" fill="${calyx}" stroke="${darken(calyx, 0.35)}" stroke-width=".8"/>`;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
  }
  const k = 0.35 + 0.65 * open;
  const fade = 1 - 0.3 * wilt;
  const dry = '#8a7a5a';
  const col = (u: number) => mix(mix(pal.petalDeep, pal.petal, 0.5 + u * 0.5), dry, smooth(0.05, 0.9, wilt));
  const L = R * k * fade;
  const petals: [number, number, number, number, number][] = [
    // angle, length, width, colour u, baseR
    [180, 0.95, 0.9, 0.2, 0.05],
    [-78, 0.88, 0.62, 0.5, 0.06],
    [78, 0.88, 0.62, 0.5, 0.06],
    [-22, 1.0, 0.72, 0.9, 0.06],
    [22, 1.0, 0.72, 0.9, 0.06],
  ];
  for (const [a, lm, wm, u, b] of petals) {
    const fill = col(u);
    g += `<path d="${petalAt(0, 0, a, L * b, L * lm, L * wm, 0.05, 0.62)}" fill="${fill}" stroke="${darken(fill, 0.35)}" stroke-width=".8" stroke-linejoin="round"/>`;
  }
  // The pale "face" blotch and whisker lines.
  const eye = mix(pal.accent ?? pal.center, dry, smooth(0.05, 0.9, wilt));
  g += `<ellipse cx="0" cy="${f(L * 0.06)}" rx="${f(L * 0.2)}" ry="${f(L * 0.17)}" fill="${eye}" stroke="${darken(eye, 0.3)}" stroke-width=".6"/>`;
  let wh = '';
  for (const a of [140, 160, 180, 200, 220]) {
    const r = (a * Math.PI) / 180;
    wh += `M0 ${f(L * 0.06)}L${f(Math.sin(r) * L * 0.5)} ${f(-Math.cos(r) * L * 0.5 + L * 0.06)}`;
  }
  g += `<path d="${wh}" stroke="${darken(pal.petalDeep, 0.4)}" stroke-width=".9" stroke-linecap="round" opacity=".7"/>`;
  g += `<circle cx="0" cy="${f(L * 0.06)}" r="${f(L * 0.05)}" fill="${lighten(pal.center, 0.4)}"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}

export const pansy: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        maxH: 190,
        stemW: 5,
        leavesPerStem: 8,
        leaf: { pairs: 1, length: 54, leafletLen: 40, leafletWid: 20, spread: 40 },
        leafFn: leaf,
        branches: [
          { at: 0.3, dx: -84, dy: -62, delay: 0.14, size: 0.9 },
          { at: 0.36, dx: 86, dy: -76, delay: 0.26, size: 0.88 },
          { at: 0.2, dx: -44, dy: -34, delay: 0.4, size: 0.7 },
          { at: 0.24, dx: 48, dy: -42, delay: 0.46, size: 0.7 },
        ],
        head: face,
      })
    );
  },
};
