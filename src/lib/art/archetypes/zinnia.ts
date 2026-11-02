import { CX, clamp01, f, linearGradient } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant } from './bush';
import { pomponHead } from './pompon';
import type { ArchetypeRenderer } from './types';

/** A zinnia "seed" is a flat, wedge-shaped, pale brown achene with a notched tip. */
function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(14)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<path d="M-4 -16L4 -16L3 -12L9 10C9 16 4 19 0 19C-4 19 -9 16 -9 10L-3 -12Z" fill="#b99660" stroke="#4a3418" stroke-width="1.1" stroke-linejoin="round"/>` +
    `<path d="M0 -12V14M-4 4Q-5 11 0 15M4 4Q5 11 0 15" stroke="#7a5c30" stroke-width="1" fill="none" opacity=".6"/>` +
    `</g>`
  );
}

export const zinnia: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        maxH: 292,
        stemW: 7,
        leavesPerStem: 7,
        // Broad, rough-textured, opposite leaves.
        leaf: { pairs: 1, length: 72, leafletLen: 56, leafletWid: 25, spread: 56 },
        branches: [
          { at: 0.3, dx: -104, dy: -88, delay: 0.2, size: 0.84 },
          { at: 0.36, dx: 100, dy: -108, delay: 0.34, size: 0.8 },
          { at: 0.18, dx: -58, dy: -46, delay: 0.46, size: 0.64 },
        ],
        // Layered double flower: many tidy, overlapping rounded petals.
        head: (cc, x, y, a, sc, st) =>
          pomponHead(cc, x, y, a, sc, st, {
            radius: 80,
            layers: 11,
            outerCount: 16,
            innerCount: 9,
            outerWid: 0.42,
            innerWid: 0.34,
            outerLen: 0.68,
            innerLen: 0.3,
            tip: 0.06,
            belly: 0.58,
            jitter: 1.5,
            calyx: cc.pal.leaf,
          }),
      })
    );
  },
};
