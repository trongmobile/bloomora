import { linearGradient } from '../core';
import { bushPlant } from './bush';
import { pomponHead } from './pompon';
import type { ArchetypeRenderer } from './types';

export const marigold: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return bushPlant(c, {
      maxH: 300,
      stemW: 7,
      leavesPerStem: 8,
      leaf: { pairs: 5, length: 78, leafletLen: 30, leafletWid: 7, spread: 62 },
      branches: [
        { at: 0.28, dx: -96, dy: -120, delay: 0.18, size: 0.82 },
        { at: 0.4, dx: 92, dy: -138, delay: 0.3, size: 0.78 },
        { at: 0.16, dx: -50, dy: -62, delay: 0.42, size: 0.6 },
      ],
      head: (cc, x, y, a, sc, st) =>
        pomponHead(cc, x, y, a, sc, st, {
          radius: 66,
          layers: 6,
          outerCount: 15,
          innerCount: 7,
          outerWid: 0.46,
          innerWid: 0.34,
          outerLen: 0.62,
          innerLen: 0.3,
          tip: 0.1,
          belly: 0.5,
          jitter: 4,
          calyx: cc.pal.leaf,
        }),
    });
  },
};
