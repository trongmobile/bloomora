import { CX, clamp01, cubicAt, darken, f, leafAt, linearGradient, mix, type Ctx, type Cubic } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant } from './bush';
import { pomponHead } from './pompon';
import type { ArchetypeRenderer } from './types';

function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(-20)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<ellipse rx="8" ry="10" fill="#2e2622" stroke="#120d0a" stroke-width="1.1"/>` +
    `<path d="M-4 -5Q0 -9 4 -5" stroke="#6a5a4e" stroke-width="1.2" fill="none" opacity=".6"/>` +
    `</g>`
  );
}

/** Long, narrow, blue-green blades in opposite pairs. */
function blade(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  const fill = dry > 0.05 ? mix(c.pal.leaf, '#a08c45', dry * 0.75) : c.url('leaf');
  // Blades spread out and arch over instead of hugging the stem.
  const a = Math.cos((angle * Math.PI) / 180) > 0 ? -8 : 188;
  const d = leafAt(x, y, a, 98 * scale, 8 * scale, 0.24 + dry * 0.2, 0.85, a > 0 ? -1 : 1);
  return `<path d="${d}" fill="${fill}" stroke="${darken(col, 0.35)}" stroke-width=".7" stroke-linejoin="round"/>`;
}

/** Swollen joints along the stem, a carnation signature. */
function nodes(c: Ctx, curve: Cubic, color: string): string {
  const k = clamp01(c.s.stem);
  if (k < 0.15) return '';
  let g = '';
  for (let i = 1; i <= 5; i++) {
    const t = i / 6;
    if (t > k) break;
    const [x, y] = cubicAt(curve, t);
    g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="6.2" ry="3.4" fill="${mix(color, '#ffffff', 0.12)}" stroke="${darken(color, 0.4)}" stroke-width=".9"/>`;
  }
  return g;
}

export const carnation: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        maxH: 296,
        stemW: 4.6,
        leavesPerStem: 8,
        leaf: { pairs: 1, length: 90, leafletLen: 30, leafletWid: 6, spread: 40 },
        leafFn: blade,
        decor: nodes,
        branches: [
          { at: 0.34, dx: -82, dy: -112, delay: 0.2, size: 0.84 },
          { at: 0.42, dx: 80, dy: -126, delay: 0.34, size: 0.8 },
          { at: 0.22, dx: -48, dy: -60, delay: 0.46, size: 0.66 },
        ],
        head: (cc, x, y, a, sc, st) =>
          pomponHead(cc, x, y, a, sc, st, {
            radius: 60,
            layers: 6,
            outerCount: 20,
            innerCount: 9,
            outerWid: 0.52,
            innerWid: 0.4,
            outerLen: 0.62,
            innerLen: 0.3,
            tip: 0.0,
            belly: 0.55,
            jitter: 9,
            calyx: cc.pal.leaf,
          }),
      })
    );
  },
};
