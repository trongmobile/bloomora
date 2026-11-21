/** Tam giác mạch (buckwheat): reddish stems, arrow-shaped leaves and loose clusters of tiny five-petal florets. */
import { CX, clamp01, darken, f, leafAt, linearGradient, mix, mulberry32, petalAt, smooth, type Ctx } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant, type LocalState } from './bush';
import type { ArchetypeRenderer } from './types';

/** The three-edged seed that gives the plant its Vietnamese name. */
function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(-14)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<path d="M0 -17L11 6C8 12 -8 12 -11 6Z" fill="#5a3a22" stroke="#24150a" stroke-width="1.2" stroke-linejoin="round"/>` +
    `<path d="M0 -13V8M0 -2L-6 7M0 -2L6 7" fill="none" stroke="#9a7a52" stroke-width=".9" opacity=".6"/>` +
    `</g>`
  );
}

/** Heart/arrow-shaped leaf: broad at the base, pointed tip. */
function leaf(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const flip = Math.cos((angle * Math.PI) / 180) < 0 ? -1 : 1;
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  return `<path d="${leafAt(x, y, angle, 50 * scale, 30 * scale, 0.04, 0.3, flip)}" fill="${dry > 0.05 ? col : c.url('leaf')}" stroke="${darken(col, 0.4)}" stroke-width=".8" stroke-linejoin="round"/>`;
}

const SPOTS = (() => {
  const rnd = mulberry32(77);
  return Array.from({ length: 6 }, (_, k) => {
    const cx = (k - 2.5) * 14;
    const cy = -10 - (k % 2) * 12 - rnd() * 6;
    return Array.from({ length: 6 }, () => ({ x: cx + (rnd() - 0.5) * 22, y: cy + (rnd() - 0.5) * 26, r: 0.8 + rnd() * 0.5, rot: rnd() * 360 }));
  }).flat();
})();

function head(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.04) return '';
  const wilt = smooth(0, 1, st.wilt);
  const green = mix(mix(pal.leaf, '#8fc96a', 0.35), pal.petalDeep, smooth(0.5, 1, st.bud) * 0.4);
  let buds = '';
  let petals = '';
  let seeds = '';
  SPOTS.forEach((p, i) => {
    const local = smooth(0, 1, st.open * 1.5 - (i / SPOTS.length) * 0.5);
    const px = p.x * scale;
    const py = p.y * scale * (0.5 + 0.5 * bud);
    if (local < 0.06) {
      buds += `<circle cx="${f(px)}" cy="${f(py)}" r="${f(2.8 * scale * (0.5 + 0.5 * bud))}"/>`;
      return;
    }
    if (st.fruit > 0.1 && i % 2 === 0) {
      seeds += `<path d="M${f(px)} ${f(py - 3.4 * scale)}L${f(px + 2.8 * scale)} ${f(py + 2 * scale)}L${f(px - 2.8 * scale)} ${f(py + 2 * scale)}Z"/>`;
      return;
    }
    if (wilt > 0.4 && i % 2 === 1) return;
    for (let k = 0; k < 5; k++) petals += petalAt(px, py, k * 72 + p.rot * 0.2, 0.5 * scale, 5.6 * scale * local, 3.4 * scale * local, 0.1, 0.62);
  });
  let g = `<circle cx="0" cy="-14" r="0" />`;
  if (buds) g += `<g fill="${green}" stroke="${darken(green, 0.3)}" stroke-width=".4">${buds}</g>`;
  if (petals) {
    const col = mix(mix(pal.petal, pal.petalDeep, 0.3), '#b89a8a', smooth(0.1, 0.9, wilt));
    g += `<path d="${petals}" fill="${col}" stroke="${pal.petalDeep}" stroke-width=".6" stroke-opacity=".8"/>`;
  }
  if (seeds) g += `<g fill="${mix('#7a5a38', '#4a3220', 0.2)}" stroke="#24150a" stroke-width=".4">${seeds}</g>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot * 0.3)})">${g}</g>`;
}

export const buckwheat: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        maxH: 224,
        stemW: 4.4,
        leavesPerStem: 6,
        leaf: { pairs: 1, length: 50, leafletLen: 40, leafletWid: 22, spread: 40 },
        leafFn: leaf,
        branches: [
          { at: 0.3, dx: -72, dy: -60, delay: 0.14, size: 0.96 },
          { at: 0.36, dx: 74, dy: -70, delay: 0.22, size: 0.94 },
          { at: 0.2, dx: -110, dy: -34, delay: 0.34, size: 0.84 },
          { at: 0.24, dx: 112, dy: -40, delay: 0.42, size: 0.82 },
        ],
        head,
      })
    );
  },
};
