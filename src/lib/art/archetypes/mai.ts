import { CX, clamp01, f } from '../core';
import { SEED_Y } from '../scene';
import { blossomTree } from './sakura';

/** Mai seed: a small, curved, green-brown kernel from the fruit. */
function kernel(k: number): string {
  if (k <= 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(24)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<path d="M-3 -14C6 -12 10 -2 7 8C5 14 0 16 -3 14C-8 8 -8 -8 -3 -14Z" fill="#4b4a2a" stroke="#1f1e10" stroke-width="1.2"/>` +
    `<path d="M-2 -10C2 -4 3 4 0 11" fill="none" stroke="#7a7646" stroke-width="1" opacity=".6"/>` +
    `</g>`
  );
}

/** Yellow apricot blossom: five broad rounded petals; after they fall, red sepals carry black drupes. */
export const mai = blossomTree({
  seed: kernel,
  petal: 'M0 0C-10 -3 -13 -12 -6 -15.5C-2.5 -17 2.5 -17 6 -15.5C13 -12 10 -3 0 0Z',
  fruit: [
    { fill: '#c0392b', stroke: '#6e1a12', r: 3.6, dy: 4 },
    { fill: '#1d1a17', stroke: '#000000', r: 1.9, dy: 2 },
  ],
  autumn: 0,
  bud: '#a8832a',
});
