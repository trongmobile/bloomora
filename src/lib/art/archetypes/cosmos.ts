import { CX, clamp01, f, linearGradient } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant } from './bush';
import { daisyHead } from './daisy';
import type { ArchetypeRenderer } from './types';

/** Cosmos seeds are slim, dark and slightly curved. */
function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(-28)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<path d="M0 -17C5 -12 6 8 2 18C0 20 -1 20 -3 17C-7 6 -6 -12 0 -17Z" fill="#3a2e22" stroke="#17100a" stroke-width="1.1"/>` +
    `<path d="M-1 -12C-3 -2 -3 8 -1 15" stroke="#8a7658" stroke-width="1.2" fill="none" opacity=".6"/>` +
    `</g>`
  );
}

export const cosmos: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        maxH: 318,
        stemW: 5,
        leavesPerStem: 7,
        // Thread-like, finely divided leaves.
        leaf: { pairs: 4, length: 84, leafletLen: 38, leafletWid: 2.8, spread: 62 },
        branches: [
          { at: 0.3, dx: -112, dy: -96, delay: 0.16, size: 0.88 },
          { at: 0.36, dx: 110, dy: -120, delay: 0.26, size: 0.84 },
          { at: 0.2, dx: -64, dy: -50, delay: 0.4, size: 0.7 },
          { at: 0.24, dx: 66, dy: -58, delay: 0.5, size: 0.66 },
        ],
        head: (cc, x, y, a, sc, st) =>
          daisyHead(cc, x, y, a, sc, st, {
            radius: 70,
            petals: 8,
            petalWid: 0.58,
            petalLen: 0.92,
            tip: 0.0,
            belly: 0.62,
            disc: 0.2,
            calyx: cc.pal.leaf,
          }),
      })
    );
  },
};
