/** Dã quỳ (Mexican sunflower): a tall, branching bush with big broad leaves and wide orange-yellow daisy heads. */
import { CX, clamp01, darken, f, leafAt, linearGradient, mix, type Ctx } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant } from './bush';
import { daisyHead } from './daisy';
import type { ArchetypeRenderer } from './types';

function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(-24)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<path d="M-6 -16L0 -22L6 -16L5 12C3 17 -3 17 -5 12Z" fill="#4a3c2c" stroke="#1c140a" stroke-width="1.1" stroke-linejoin="round"/>` +
    `<path d="M0 -17V12" stroke="#a8946e" stroke-width="1.1" opacity=".55"/>` +
    `</g>`
  );
}

/** Broad, pointed, slightly lobed leaf with a pale midrib. */
function leaf(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const L = 84 * scale;
  const a = (angle * Math.PI) / 180;
  const flip = Math.cos(a) < 0 ? -1 : 1;
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  const tipX = x + Math.cos(a) * L;
  const tipY = y + Math.sin(a) * L;
  return (
    `<path d="${leafAt(x, y, angle, L, 30 * scale, 0.1, 0.8, flip)}" fill="${dry > 0.05 ? col : c.url('leaf')}" stroke="${darken(col, 0.4)}" stroke-width=".8" stroke-linejoin="round"/>` +
    `<path d="M${f(x)} ${f(y)}L${f(tipX)} ${f(tipY)}" stroke="${mix(col, '#ffffff', 0.4)}" stroke-width="1" stroke-linecap="round" opacity=".6"/>`
  );
}

export const daQuy: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        maxH: 340,
        stemW: 8,
        leavesPerStem: 7,
        leaf: { pairs: 1, length: 84, leafletLen: 60, leafletWid: 24, spread: 40 },
        leafFn: leaf,
        branches: [
          { at: 0.24, dx: -118, dy: -112, delay: 0.16, size: 0.92 },
          { at: 0.3, dx: 120, dy: -132, delay: 0.26, size: 0.9 },
          { at: 0.14, dx: -70, dy: -64, delay: 0.4, size: 0.74 },
          { at: 0.18, dx: 72, dy: -72, delay: 0.5, size: 0.7 },
        ],
        // Wide, flat heads with relatively few broad petals and a golden centre.
        head: (cc, x, y, a, sc, st) =>
          daisyHead(cc, x, y, a, sc, st, { radius: 78, petals: 13, petalWid: 0.34, petalLen: 0.96, tip: 0.2, belly: 0.55, disc: 0.3, calyx: cc.pal.leaf }),
      })
    );
  },
};
