import { CX, clamp01, f, linearGradient } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant } from './bush';
import { daisyHead } from './daisy';
import type { ArchetypeRenderer } from './types';

/** A daisy "seed" is a tiny, flat, pale achene; a small pinch of them sits on the soil. */
function seed(k: number): string {
  if (k < 0.02) return '';
  const one = (x: number, y: number, r: number) =>
    `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 -9C4 -5 4 5 1 10C0 11 -1 11 -2 10C-5 4 -4 -5 0 -9Z" fill="#cdb98a" stroke="#6a583a" stroke-width="1"/><path d="M0 -6V7" stroke="#8a7650" stroke-width=".9" opacity=".6"/></g>`;
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6})" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    one(-9, 3, -40) +
    one(0, 0, 8) +
    one(10, 4, 52) +
    `</g>`
  );
}

export const daisy: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        // A low plant with short stems and many small heads.
        maxH: 170,
        stemW: 3.2,
        leavesPerStem: 5,
        // Broad, spoon-shaped leaves close to the ground.
        leaf: { pairs: 1, length: 70, leafletLen: 40, leafletWid: 24, spread: 56 },
        branches: [
          { at: 0.18, dx: -92, dy: -52, delay: 0.14, size: 0.9 },
          { at: 0.22, dx: 90, dy: -64, delay: 0.22, size: 0.88 },
          { at: 0.14, dx: -48, dy: -34, delay: 0.32, size: 0.8 },
          { at: 0.16, dx: 52, dy: -40, delay: 0.4, size: 0.78 },
          { at: 0.1, dx: -128, dy: -28, delay: 0.5, size: 0.7 },
          { at: 0.12, dx: 126, dy: -34, delay: 0.58, size: 0.68 },
        ],
        head: (cc, x, y, a, sc, st) =>
          daisyHead(cc, x, y, a, sc, st, {
            radius: 40,
            petals: 24,
            petalWid: 0.2,
            petalLen: 0.98,
            tip: 0.0,
            belly: 0.5,
            disc: 0.34,
            calyx: cc.pal.leaf,
          }),
      })
    );
  },
};
