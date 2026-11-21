/** Cẩm tú cầu (hydrangea): big serrated leaves in pairs and round heads made of dozens of four-sepal florets. */
import { CX, GOLDEN_ANGLE, clamp01, darken, dotsPath, f, leafAt, lighten, linearGradient, mix, petalAt, smooth, type Ctx } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant, type LocalState } from './bush';
import type { ArchetypeRenderer } from './types';

/** Seeds are dust-fine: a few specks on the soil. */
function seed(k: number): string {
  if (k < 0.02) return '';
  let d = '';
  [[-8, 2], [-2, -3], [5, 1], [9, 5], [-5, 6], [1, 5]].forEach(([x, y]) => (d += `M${x! + 1.6} ${y}a1.6 1.1 0 1 0 -3.2 0a1.6 1.1 0 1 0 3.2 0`));
  return `<g transform="translate(${CX} ${SEED_Y + 6})" opacity="${f(clamp01(k))}" aria-hidden="true"><path d="${d}" fill="#5a4630" stroke="#2a1d10" stroke-width=".5"/></g>`;
}

function leaf(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const L = 78 * scale;
  const flip = Math.cos((angle * Math.PI) / 180) < 0 ? -1 : 1;
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  const a = (angle * Math.PI) / 180;
  return (
    `<path d="${leafAt(x, y, angle, L, 34 * scale, 0.06, 0.72, flip)}" fill="${dry > 0.05 ? col : c.url('leaf')}" stroke="${darken(col, 0.4)}" stroke-width=".9" stroke-linejoin="round"/>` +
    `<path d="M${f(x)} ${f(y)}L${f(x + Math.cos(a) * L * 0.95)} ${f(y + Math.sin(a) * L * 0.95)}" stroke="${lighten(col, 0.4)}" stroke-width="1" stroke-linecap="round" opacity=".6"/>`
  );
}

const N = 46;

function head(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.04) return '';
  const wilt = smooth(0, 1, st.wilt);
  const R = 50 * scale * (0.3 + 0.7 * bud);
  const tipCol = pal.petalTip ?? lighten(pal.petal, 0.4);
  const dry = '#a8a278';
  const green = mix(pal.leaf, pal.petal, smooth(0.4, 1, st.bud) * 0.5);
  const groups: [string, string][] = [[mix(pal.petalDeep, pal.petal, 0.5), ''], [pal.petal, ''], [tipCol, '']];
  let dots: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < N; i++) {
    const rr = R * Math.sqrt((i + 0.5) / N);
    const px = Math.cos(i * GOLDEN_ANGLE) * rr;
    const py = -R * 0.55 + Math.sin(i * GOLDEN_ANGLE) * rr * 0.82 - (1 - rr / R) * R * 0.1;
    const local = smooth(0, 1, st.open * 1.5 - (rr / R) * 0.5);
    const size = R * 0.2 * (1 - 0.22 * (rr / R));
    if (local < 0.05) {
      dots.push({ x: px, y: py, r: size * 0.45 * (0.5 + 0.5 * bud) });
      continue;
    }
    let d = '';
    for (let k = 0; k < 4; k++) d += petalAt(px, py, k * 90 + 45 + i * 13, size * 0.08, size * local * (1 - 0.2 * wilt), size * 0.95 * local, 0.05, 0.62);
    groups[i % 3]![1] += d;
  }
  let g = '';
  g += `<path d="M${f(-R * 0.1)} 2Q0 ${f(-R * 0.1)} ${f(R * 0.1)} 2" stroke="${pal.leaf}" stroke-width="2" fill="none"/>`;
  if (dots.length) g += `<path d="${dotsPath(dots)}" fill="${green}" stroke="${darken(green, 0.3)}" stroke-width=".5"/>`;
  for (const [col, d] of groups) {
    if (!d) continue;
    const fill = mix(col, dry, smooth(0.15, 0.95, wilt));
    g += `<path d="${d}" fill="${fill}" stroke="${darken(fill, 0.28)}" stroke-width=".5" stroke-linejoin="round" stroke-opacity=".6"/>`;
  }
  if (st.open > 0.3) {
    dots = [];
    for (let i = 0; i < N; i += 2) {
      const rr = R * Math.sqrt((i + 0.5) / N);
      dots.push({ x: Math.cos(i * GOLDEN_ANGLE) * rr, y: -R * 0.55 + Math.sin(i * GOLDEN_ANGLE) * rr * 0.82 - (1 - rr / R) * R * 0.1, r: R * 0.02 });
    }
    g += `<path d="${dotsPath(dots)}" fill="${pal.center}" opacity=".9"/>`;
  }
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot * 0.3)})">${g}</g>`;
}

export const hydrangea: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        maxH: 270,
        stemW: 7,
        leavesPerStem: 8,
        leaf: { pairs: 1, length: 78, leafletLen: 60, leafletWid: 26, spread: 40 },
        leafFn: leaf,
        branches: [
          { at: 0.3, dx: -104, dy: -78, delay: 0.16, size: 1 },
          { at: 0.34, dx: 106, dy: -92, delay: 0.26, size: 0.96 },
          { at: 0.18, dx: -58, dy: -42, delay: 0.4, size: 0.8 },
          { at: 0.2, dx: 60, dy: -50, delay: 0.5, size: 0.78 },
        ],
        head,
      })
    );
  },
};
