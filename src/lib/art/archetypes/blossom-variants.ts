/**
 * Vietnamese flowering trees drawn with the shared blossom-tree engine, each with its own
 * petal shape, petal count, bark and fruit: bằng lăng, ban and sưa.
 */
import { CX, clamp01, f } from '../core';
import { SEED_Y } from '../scene';
import { blossomTree } from './sakura';

function soilSeed(k: number, rot: number, inner: string): string {
  if (k <= 0.02) return '';
  return `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(${rot})" opacity="${f(clamp01(k))}" aria-hidden="true">${inner}</g>`;
}

/** A small seed with a thin papery wing, from the dry capsule. */
const wingedSeed = (k: number): string =>
  soilSeed(
    k,
    -18,
    `<path d="M-14 -4C-8 -14 8 -14 14 -4C8 4 -8 4 -14 -4Z" fill="#d8c79a" stroke="#7a6a3a" stroke-width="1" opacity=".85"/>` +
      `<ellipse cx="0" cy="-3" rx="5" ry="8" fill="#6a4a2a" stroke="#2e1d0e" stroke-width="1.1"/>`,
  );

/** A flat bean-like seed from a long pod. */
const beanSeed = (k: number): string =>
  soilSeed(
    k,
    14,
    `<path d="M-10 -6C-2 -13 10 -9 11 0C10 9 -2 12 -9 7C-12 3 -12 -2 -10 -6Z" fill="#6a4a2c" stroke="#2e1d0e" stroke-width="1.2"/>` +
      `<path d="M-6 -4C0 -7 5 -4 6 1" fill="none" stroke="#a38358" stroke-width="1" opacity=".6"/>`,
  );

/** A small flat disc seed. */
const discSeed = (k: number): string =>
  soilSeed(
    k,
    -8,
    `<path d="M0 -13C9 -10 11 4 5 11C2 14 -2 14 -5 11C-11 4 -9 -10 0 -13Z" fill="#a8855a" stroke="#4d3520" stroke-width="1.2"/>` +
      `<path d="M0 -10V10" stroke="#6e4e2c" stroke-width="1" opacity=".6"/>`,
  );

/** Bằng lăng: six broad, crinkled petals in lilac to purple; round brown capsules after the petals fall. */
export const bangLang = blossomTree({
  seed: wingedSeed,
  petals: 6,
  petal: 'M0 0C-13 -2 -16 -12 -9 -16.5C-6 -18.2 -3.5 -15.8 -1.5 -17.2C0 -18.2 1.5 -17.2 1.5 -17.2C3.5 -15.8 6 -18.2 9 -16.5C16 -12 13 -2 0 0Z',
  fruit: [{ fill: '#8a6a45', stroke: '#4a3420', r: 3.2, dy: 5 }],
  autumn: 0.35,
  bud: '#7b3fa8',
  bark: '#6a5a4c',
});

/** Ban: five narrow, strap-like petals that make an orchid-like flower; long pods after flowering. */
export const ban = blossomTree({
  seed: beanSeed,
  petals: 5,
  petal: 'M0 0C-4 -5 -7 -12 -4.5 -18.5C-3 -21 3 -21 4.5 -18.5C7 -12 4 -5 0 0Z',
  fruit: [
    { fill: '#6a4a2c', stroke: '#2e1d0e', r: 1.9, dy: 7 },
    { fill: '#6a4a2c', stroke: '#2e1d0e', r: 1.9, dy: 12 },
    { fill: '#6a4a2c', stroke: '#2e1d0e', r: 1.9, dy: 17 },
  ],
  autumn: 0.15,
  bud: '#a8326a',
  bark: '#7a6a5a',
});

/** Sưa: small, rounded white petals on a dark, leafless crown; flat tan pods follow. */
export const sua = blossomTree({
  seed: discSeed,
  petals: 5,
  petal: 'M0 0C-6.5 -3 -8.5 -9 -3.8 -12C-1.2 -13.2 1.2 -13.2 3.8 -12C8.5 -9 6.5 -3 0 0Z',
  fruit: [{ fill: '#c8b27a', stroke: '#6a5a2a', r: 2.8, dy: 5 }],
  autumn: 0.2,
  bud: '#a8832a',
  bark: '#3a2c26',
});
