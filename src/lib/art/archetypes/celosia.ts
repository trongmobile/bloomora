import { CX, clamp01, darken, f, lighten, linearGradient, mix, smooth } from '../core';
import { SEED_Y } from '../scene';
import { bushPlant, type LocalState } from './bush';
import type { ArchetypeRenderer } from './types';
import type { Ctx } from '../core';

/** A celosia seed is a tiny, glossy, black lens. */
function seed(k: number): string {
  if (k < 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(-20)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<ellipse rx="5" ry="6.5" fill="#1c1514" stroke="#000" stroke-width="1"/>` +
    `<path d="M-2.2 -3Q-.5 -4.8 1.6 -3.8" stroke="#6a5a55" stroke-width="1" fill="none" opacity=".7"/>` +
    `</g>`
  );
}

/** Points of a ruffled, convoluted outline around the crest's dome; `inset` shrinks it for inner folds. */
function ruffle(w: number, h: number, inset: number, phase: number, amp: number): [number, number][] {
  const pts: [number, number][] = [];
  const steps = 96;
  const cy = -h * 0.3;
  for (let i = 0; i <= steps; i++) {
    const th = Math.PI * (1.02 - 1.04 * (i / steps)); // left → right over the top
    const r = 1 - inset;
    const wob =
      1 + amp * Math.sin(th * 15 + phase) + amp * 0.7 * Math.sin(th * 7.3 + phase * 1.7) + amp * 0.5 * Math.sin(th * 31 + phase * 0.6);
    pts.push([Math.cos(th) * w * r * wob, cy - Math.sin(th) * h * 0.7 * r * wob]);
  }
  return pts;
}

/** The cockscomb: a wide, velvety, brain-like ruffled crest on a thick flattened neck. */
function crest(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.04) return '';
  const open = smooth(0, 1, st.open);
  const wilt = smooth(0, 1, st.wilt);
  const k = (0.26 + 0.74 * bud) * (0.7 + 0.3 * open) * (1 - 0.2 * wilt);
  const w = 56 * scale * k;
  const h = 84 * scale * k;
  const dryT = smooth(0.1, 1, wilt) * 0.75;
  const base = mix(pal.petal, '#8a6a3a', dryT);
  const hi = mix(pal.petalTip ?? lighten(pal.petal, 0.25), '#b59a60', dryT);
  const neckC = mix(pal.stem, '#8c7a3c', dryT);
  const sag = wilt * 8 * scale;
  const toD = (pts: [number, number][], close: boolean): string => {
    let d = `M${f(pts[0]![0])} ${f(pts[0]![1] + sag * Math.abs(pts[0]![0]) / (w || 1))}`;
    for (let i = 1; i < pts.length; i++) d += `L${f(pts[i]![0])} ${f(pts[i]![1] + sag * Math.abs(pts[i]![0]) / (w || 1))}`;
    return close ? `${d}Z` : d;
  };
  const outer = ruffle(w, h, 0, 0.4, 0.06);
  // Close the outline with a narrow waist at the base.
  const body = toD(outer, false) + `C${f(w * 1.02)} ${f(-h * 0.08)} ${f(w * 0.55)} ${f(h * 0.01)} ${f(w * 0.16)} 6L${f(-w * 0.16)} 6C${f(-w * 0.55)} ${f(h * 0.01)} ${f(-w * 1.02)} ${f(-h * 0.08)} ${f(outer[0]![0])} ${f(outer[0]![1])}Z`;
  let folds = '';
  let lights = '';
  [0.16, 0.34, 0.52].forEach((ins, i) => {
    const pts = ruffle(w, h, ins, 1.3 + i * 1.9, 0.06 - i * 0.01);
    folds += toD(pts, false);
    lights += toD(pts.map(([px, py]) => [px + 1.3, py - 1.1] as [number, number]), false);
  });
  const neckW = 6.5 * scale;
  return (
    `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">` +
    `<path d="M${f(-neckW)} 16Q${f(-neckW * 0.6)} 4 ${f(-w * 0.18)} ${f(-2)}L${f(w * 0.18)} ${f(-2)}Q${f(neckW * 0.6)} 4 ${f(neckW)} 16Z" fill="${neckC}" stroke="${darken(neckC, 0.4)}" stroke-width="1"/>` +
    `<path d="${body}" fill="${c.url('celCrest')}" stroke="${darken(base, 0.45)}" stroke-width="1.1" stroke-linejoin="round"/>` +
    `<path d="${lights}" fill="none" stroke="${hi}" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>` +
    `<path d="${folds}" fill="none" stroke="${darken(base, 0.5)}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>` +
    `</g>`
  );
}

export const celosia: ArchetypeRenderer = {
  defs(c) {
    const p = c.pal;
    return (
      linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0) +
      linearGradient(c.id('celCrest'), [[0, p.petalDeep], [0.5, p.petal], [1, p.petalTip ?? lighten(p.petal, 0.25)]], 0, 1, 0, 0)
    );
  },
  plant(c) {
    return (
      seed(c.s.seed) +
      bushPlant(c, {
        maxH: 270,
        stemW: 8,
        leavesPerStem: 7,
        leaf: { pairs: 1, length: 78, leafletLen: 62, leafletWid: 20, spread: 40 },
        branches: [
          { at: 0.32, dx: -92, dy: -80, delay: 0.24, size: 0.78 },
          { at: 0.4, dx: 90, dy: -96, delay: 0.38, size: 0.74 },
        ],
        head: crest,
      })
    );
  },
};
