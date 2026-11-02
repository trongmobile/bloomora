import { CX, clamp01, darken, dotsPath, f, lighten, linearGradient, mix, GOLDEN_ANGLE } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant } from './bush';
import { daisyHead } from './daisy';
import type { ArchetypeRenderer } from './types';

/** Echinacea seeds are small, dark, four-sided achenes with a blunt, pale-flecked tip. */
function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(18)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<path d="M-6 -13L6 -13C8 -4 7 6 4 14L-4 14C-7 6 -8 -4 -6 -13Z" fill="#5a4630" stroke="#20150a" stroke-width="1.1"/>` +
    `<path d="M-6 -13L6 -13L4 -9L-4 -9Z" fill="#d8c9a2" stroke="#20150a" stroke-width=".7"/>` +
    `<path d="M-2 -7C-3 0 -3 7 -2 12M2 -7C3 0 3 7 2 12" stroke="#a89068" stroke-width="1" fill="none" opacity=".55"/>` +
    `</g>`
  );
}

/** The raised, spiny cone that sits on top of the flat daisy disc. */
function cone(x: number, y: number, rot: number, R: number, open: number, wilt: number): string {
  if (open < 0.3) return '';
  const k = clamp01((open - 0.3) / 0.7);
  const r = R * 0.34 * (0.5 + 0.5 * k);
  const col = mix('#a8541c', '#4a2a16', clamp01(wilt) * 0.8);
  let g = `<ellipse cx="0" cy="${f(-r * 0.15)}" rx="${f(r)}" ry="${f(r * 0.9)}" fill="${col}" stroke="${darken(col, 0.4)}" stroke-width=".9"/>`;
  const dots: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 40; i++) {
    const rr = r * 0.9 * Math.sqrt((i + 0.5) / 40);
    dots.push({ x: Math.cos(i * GOLDEN_ANGLE) * rr, y: Math.sin(i * GOLDEN_ANGLE) * rr * 0.9 - r * 0.15, r: Math.max(0.6, r * 0.07) });
  }
  g += `<path d="${dotsPath(dots)}" fill="${lighten(col, 0.35)}" opacity=".75"/>`;
  g += `<ellipse cx="${f(-r * 0.3)}" cy="${f(-r * 0.5)}" rx="${f(r * 0.4)}" ry="${f(r * 0.28)}" fill="#ffd9a0" opacity=".22"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}

export const echinacea: ArchetypeRenderer = {
  defs(c) {
    return linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0);
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        maxH: 300,
        stemW: 6.5,
        leavesPerStem: 8,
        // Broad, rough, lance-shaped leaves, no leaflets.
        leaf: { pairs: 1, length: 100, leafletLen: 56, leafletWid: 20, spread: 30 },
        branches: [
          { at: 0.34, dx: -88, dy: -78, delay: 0.24, size: 0.78 },
          { at: 0.42, dx: 84, dy: -92, delay: 0.38, size: 0.72 },
        ],
        head: (cc, x, y, a, sc, st) =>
          // Long, narrow, purple-pink rays around a big disc, topped by a raised cone.
          daisyHead(cc, x, y, a, sc, st, {
            radius: 78,
            petals: 13,
            petalWid: 0.22,
            petalLen: 1.0,
            tip: 0.15,
            belly: 0.4,
            disc: 0.4,
            calyx: cc.pal.leaf,
          }) + cone(x, y, a, 78 * sc, st.open, st.wilt),
      })
    );
  },
};
