import {
  CX,
  clamp01,
  darken,
  f,
  leafAt,
  linearGradient,
  mix,
  petalAt,
  radialGradient,
  smooth,
  type Ctx,
} from '../core';
import { SEED_Y, fallenPetals } from '../scene';
import { bushPlant, type LocalState } from './bush';
import type { ArchetypeRenderer } from './types';

/** A hibiscus seed: a small, brown, kidney-shaped seed from a capsule. */
function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(20)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<path d="M-9 -9C0 -15 10 -8 9 3C8 13 -2 16 -7 11C-2 7 -1 1 -9 -9Z" fill="#6a4a2c" stroke="#2e1d0e" stroke-width="1.2" stroke-linejoin="round"/>` +
    `<path d="M-5 -7C2 -9 6 -3 6 3" fill="none" stroke="#a38358" stroke-width="1" opacity=".55"/>` +
    `</g>`
  );
}

/** Glossy ovate leaf with a pointed tip and a visible midrib. */
function leaf(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const L = 58 * scale;
  const W = 23 * scale;
  const bend = 0.1;
  const a = (angle * Math.PI) / 180;
  const flip = Math.cos(a) < 0 ? -1 : 1;
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  const tipX = x + Math.cos(a) * L - bend * L * flip * Math.sin(a);
  const tipY = y + Math.sin(a) * L + bend * L * flip * Math.cos(a);
  return (
    `<path d="${leafAt(x, y, angle, L, W, bend, 0.85, flip)}" fill="${dry > 0.05 ? col : c.url('leaf')}" stroke="${darken(col, 0.4)}" stroke-width=".8" stroke-linejoin="round"/>` +
    `<path d="M${f(x)} ${f(y)}L${f(tipX)} ${f(tipY)}" stroke="${darken(col, 0.25)}" stroke-width=".9" stroke-linecap="round" opacity=".7"/>`
  );
}

/** One open flower seen face-on: five broad, overlapping petals and a long staminal column. */
function hibiscusFlower(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.03) return '';
  const open = smooth(0, 1, st.open);
  const wilt = smooth(0, 1, st.wilt);
  const R = 64 * scale * (0.4 + 0.6 * bud);
  const calyx = mix(pal.leaf, '#8c7a3c', wilt * 0.6);
  let g = '';
  // Calyx: five pointed sepals under the flower.
  for (const a of [-72, -36, 0, 36, 72]) {
    g += `<path d="${petalAt(0, 0, a * 0.9, 0, R * 0.34, R * 0.16, 0.9, 0.4)}" fill="${calyx}" stroke="${darken(calyx, 0.35)}" stroke-width=".8"/>`;
  }
  if (open < 0.05) {
    // Closed bud: a twisted, pointed cone.
    const tint = mix(pal.leaf, pal.petal, smooth(0.4, 1, st.bud) * 0.55);
    g += `<path d="M0 0C${f(-R * 0.3)} ${f(-R * 0.2)} ${f(-R * 0.22)} ${f(-R * 0.82)} ${f(R * 0.02)} ${f(-R * 1.08)}C${f(R * 0.24)} ${f(-R * 0.82)} ${f(R * 0.3)} ${f(-R * 0.2)} 0 0Z" fill="${tint}" stroke="${darken(tint, 0.35)}" stroke-width=".9"/>`;
    g += `<path d="M${f(-R * 0.12)} ${f(-R * 0.1)}Q${f(R * 0.12)} ${f(-R * 0.5)} ${f(R * 0.02)} ${f(-R * 1.05)}" fill="none" stroke="${darken(tint, 0.3)}" stroke-width=".8" opacity=".6"/>`;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
  }
  const cy = -R * 0.58;
  const petalsLeft = 1 - smooth(0.55, 1, wilt);
  if (petalsLeft > 0.03) {
    const dry = mix(pal.petal, '#8a5a52', smooth(0.05, 0.8, wilt));
    const len = R * (0.5 + 0.5 * open) * (1 - 0.45 * wilt) * petalsLeft;
    const wid = R * 1.02 * (0.7 + 0.3 * open) * (1 - 0.3 * wilt);
    for (let i = 0; i < 5; i++) {
      g += `<path d="${petalAt(0, cy, i * 72 + 14, 0, len, wid, 0.05, 0.62)}" fill="${wilt > 0.05 ? dry : pal.petal}" stroke="${darken(pal.petalDeep, 0.25)}" stroke-width=".9" stroke-linejoin="round"/>`;
    }
    // Darker throat that fades outwards along each petal.
    g += `<circle cx="0" cy="${f(cy)}" r="${f(len * 0.62)}" fill="${c.url('hibThroat')}" opacity="${f(1 - wilt * 0.7)}"/>`;
    // Staminal column: yellow anthers along it, a five-lobed red stigma at the tip.
    const col = 1 - smooth(0.4, 0.9, wilt);
    if (col > 0.05) {
      const ex = R * 0.5 * col;
      const ey = cy - R * 0.52 * col;
      g += `<path d="M0 ${f(cy)}Q${f(ex * 0.3)} ${f(cy - R * 0.3 * col)} ${f(ex)} ${f(ey)}" fill="none" stroke="${darken(pal.petalDeep, 0.3)}" stroke-width="${f(2.4 * scale + 0.6)}" stroke-linecap="round"/>`;
      let an = '';
      for (let i = 0; i < 9; i++) {
        const t = 0.35 + i * 0.065;
        const px = ex * t * 1.05 + Math.sin(i * 2.4) * 3 * scale;
        const py = cy + (ey - cy) * t + Math.cos(i * 1.7) * 2.4 * scale;
        an += `M${f(px - 1.7 * scale)} ${f(py)}a${f(1.7 * scale)} ${f(1.7 * scale)} 0 1 0 ${f(3.4 * scale)} 0a${f(1.7 * scale)} ${f(1.7 * scale)} 0 1 0 ${f(-3.4 * scale)} 0`;
      }
      g += `<path d="${an}" fill="${pal.center}" stroke="${pal.centerDeep}" stroke-width=".5"/>`;
      let sg = '';
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const sx = ex + Math.cos(a) * 3.4 * scale;
        const sy = ey + Math.sin(a) * 3.4 * scale;
        sg += `M${f(sx - 1.9 * scale)} ${f(sy)}a${f(1.9 * scale)} ${f(1.9 * scale)} 0 1 0 ${f(3.8 * scale)} 0a${f(1.9 * scale)} ${f(1.9 * scale)} 0 1 0 ${f(-3.8 * scale)} 0`;
      }
      g += `<path d="${sg}" fill="${pal.accent ?? '#7a1020'}" stroke="${darken(pal.accent ?? '#7a1020', 0.4)}" stroke-width=".4"/>`;
    }
  } else if (st.fruit > 0.05) {
    // After the petals drop, a small pointed capsule is left in the calyx.
    const m = smooth(0.05, 1, st.fruit);
    const cap = mix('#6f9a3e', '#7a5a2a', m);
    g += `<path d="M0 0C${f(-R * 0.16)} ${f(-R * 0.1)} ${f(-R * 0.16)} ${f(-R * 0.36 * m)} 0 ${f(-R * 0.5 * m)}C${f(R * 0.16)} ${f(-R * 0.36 * m)} ${f(R * 0.16)} ${f(-R * 0.1)} 0 0Z" fill="${cap}" stroke="${darken(cap, 0.4)}" stroke-width=".9"/>`;
  }
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}

export const hibiscus: ArchetypeRenderer = {
  defs(c) {
    const p = c.pal;
    return (
      linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0) +
      radialGradient(c.id('hibThroat'), [[0, darken(p.petalDeep, 0.35), 0.95], [0.45, p.petalDeep, 0.65], [1, p.petalDeep, 0]], 0.5, 0.5, 0.5)
    );
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        maxH: 296,
        stemW: 8,
        leavesPerStem: 9,
        leaf: { pairs: 1, length: 58, leafletLen: 44, leafletWid: 19, spread: 40 },
        leafFn: leaf,
        branches: [
          { at: 0.3, dx: -104, dy: -96, delay: 0.2, size: 0.82 },
          { at: 0.4, dx: 100, dy: -110, delay: 0.34, size: 0.78 },
          { at: 0.18, dx: -52, dy: -50, delay: 0.5, size: 0.62 },
        ],
        head: hibiscusFlower,
      }) +
      (c.s.wilt > 0.3 ? fallenPetals(c, smooth(0.3, 1, c.s.wilt) * 8, c.pal.petal, { spread: 170, size: 16, air: 0.2 }) : '')
    );
  },
};
