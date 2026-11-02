import { CX, clamp01, f, linearGradient } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant } from './bush';
import { daisyHead } from './daisy';
import type { ArchetypeRenderer } from './types';

/** Gerbera seeds are small, tapered achenes topped with a tuft of pale bristles (the pappus). */
function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 4}) rotate(-14)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<path d="M0 -4C4 -2 5 10 2 18C0 20 -1 20 -2 18C-5 10 -4 -2 0 -4Z" fill="#8a6a42" stroke="#3a2a16" stroke-width="1.1"/>` +
    `<path d="M-1 0C-2 6 -2 12 -1 16" stroke="#c9ab7c" stroke-width="1" fill="none" opacity=".6"/>` +
    `<path d="M0 -4L-7 -17M0 -4L-3 -20M0 -4L2 -20M0 -4L7 -16M0 -4L-10 -12M0 -4L10 -11" stroke="#e8dcc0" stroke-width="1" stroke-linecap="round" fill="none"/>` +
    `</g>`
  );
}

export const gerbera: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        // One tall, leafless flower stalk; leaves stay in a low rosette at its foot.
        maxH: 300,
        stemW: 4,
        leavesPerStem: 5,
        // Broad, deeply lobed leaves.
        leaf: { pairs: 3, length: 92, leafletLen: 40, leafletWid: 16, spread: 58 },
        branches: [
          { at: 0.1, dx: -78, dy: -150, delay: 0.3, size: 0.8 },
          { at: 0.1, dx: 82, dy: -128, delay: 0.46, size: 0.72 },
        ],
        head: (cc, x, y, a, sc, st) =>
          daisyHead(cc, x, y, a, sc, st, {
            radius: 82,
            petals: 24,
            petalWid: 0.2,
            petalLen: 0.98,
            tip: 0.3,
            belly: 0.5,
            disc: 0.24,
            calyx: cc.pal.leaf,
          }),
      })
    );
  },
};
