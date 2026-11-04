import { CX, clamp01, f } from '../core';
import { SEED_Y } from '../scene';
import { blossomTree } from './sakura';

/** A peach "seed" is the hard, deeply grooved stone inside the fruit. */
function stone(k: number): string {
  if (k <= 0.02) return '';
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(-16)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<path d="M0 -17C11 -15 15 -2 12 9C9 18 3 20 0 20C-3 20 -9 18 -12 9C-15 -2 -11 -15 0 -17Z" fill="#a9794a" stroke="#5c3d22" stroke-width="1.3"/>` +
    `<path d="M0 -15C4 -4 4 8 0 18M-6 -10Q-9 0 -6 12M6 -10Q9 0 6 12M-3 -6L-5 2M3 -4L5 4" fill="none" stroke="#6e4a28" stroke-width="1.1" opacity=".7"/>` +
    `</g>`
  );
}

/** Peach blossom: five rounded petals, a young peach after the petals fall. */
export const peach = blossomTree({
  seed: stone,
  petal: 'M0 0C-9 -4 -11 -13 -4 -15.2C-1.5 -16 1.5 -16 4 -15.2C11 -13 9 -4 0 0Z',
  fruit: [{ fill: '#c9d27a', stroke: '#6a7a3a', r: 3.2, dy: 5 }],
  autumn: 0.6,
  bud: '#d6336c',
});
