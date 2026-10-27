import { CX, clamp01, darken, f, linearGradient, mix } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant } from './bush';
import { pomponHead } from './pompon';
import type { ArchetypeRenderer } from './types';

/** The tuber clump: spindle-shaped storage roots hanging from the crown of last year's stem. */
function tubers(k: number, grow: number): string {
  if (k < 0.02) return '';
  const col = '#c9a874';
  const stroke = '#6a4a2a';
  const s = 1 - 0.25 * clamp01(grow);
  const side = `<path d="M-3 -8C-17 -8 -30 4 -34 20C-36 30 -27 33 -21 26C-13 15 -8 8 0 3Z" fill="${col}" stroke="${stroke}" stroke-width="1.2"/>`;
  return (
    `<g transform="translate(${CX} ${SEED_Y + 2}) scale(${f(s)})" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    side +
    `<g transform="scale(-1 1)">${side}</g>` +
    `<path d="M-8 -10C-14 8 -12 26 0 40C12 26 14 8 8 -10Z" fill="${mix(col, '#e3c9a0', 0.4)}" stroke="${stroke}" stroke-width="1.2"/>` +
    `<path d="M-1 -6C-3 8 -2 22 0 34M-24 14Q-17 8 -10 4M24 14Q17 8 10 4" stroke="${darken(col, 0.3)}" stroke-width="1" fill="none" opacity=".5"/>` +
    `<path d="M-6 -10L-4 -22H4L6 -10Z" fill="#a8895a" stroke="${stroke}" stroke-width="1"/>` +
    `<path d="M-3 -22Q0 -30 3 -22Z" fill="#8a9a4a" stroke="${stroke}" stroke-width=".9"/>` +
    `</g>`
  );
}

export const dahlia: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      tubers(c.s.seed, c.s.stem) +
      bushPlant(c, {
        maxH: 282,
        stemW: 8,
        leavesPerStem: 7,
        // Broad leaflets in opposite pairs.
        leaf: { pairs: 2, length: 96, leafletLen: 50, leafletWid: 22, spread: 38 },
        branches: [
          { at: 0.3, dx: -106, dy: -84, delay: 0.2, size: 0.82 },
          { at: 0.38, dx: 102, dy: -106, delay: 0.38, size: 0.76 },
        ],
        head: (cc, x, y, a, sc, st) =>
          pomponHead(cc, x, y, a, sc, st, {
            radius: 88,
            layers: 9,
            outerCount: 14,
            innerCount: 8,
            outerWid: 0.4,
            innerWid: 0.32,
            outerLen: 0.7,
            innerLen: 0.32,
            tip: 0.45,
            belly: 0.46,
            jitter: 2,
            calyx: cc.pal.leaf,
          }),
      })
    );
  },
};
