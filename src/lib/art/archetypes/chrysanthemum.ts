import { linearGradient } from '../core';
import { bushPlant } from './bush';
import { pomponHead } from './pompon';
import type { ArchetypeRenderer } from './types';

export const chrysanthemum: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return bushPlant(c, {
      maxH: 270,
      stemW: 6,
      leavesPerStem: 9,
      leaf: { pairs: 3, length: 70, leafletLen: 34, leafletWid: 13, spread: 52 },
      branches: [
        { at: 0.3, dx: -110, dy: -92, delay: 0.14, size: 0.9 },
        { at: 0.36, dx: 108, dy: -110, delay: 0.26, size: 0.86 },
        { at: 0.2, dx: -62, dy: -42, delay: 0.4, size: 0.68 },
        { at: 0.22, dx: 64, dy: -50, delay: 0.5, size: 0.64 },
      ],
      head: (cc, x, y, a, sc, st) =>
        pomponHead(cc, x, y, a, sc, st, {
          radius: 74,
          layers: 8,
          outerCount: 26,
          innerCount: 12,
          outerWid: 0.17,
          innerWid: 0.15,
          outerLen: 0.66,
          innerLen: 0.3,
          tip: 0.2,
          belly: 0.62,
          jitter: 3,
          calyx: cc.pal.leaf,
        }),
    });
  },
};
