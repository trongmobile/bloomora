/**
 * A woody stem cutting pushed into the soil: the starting material for species that are
 * usually propagated by cuttings (bougainvillea, plumeria, hibiscus).
 */
import { CX, clamp01, darken, f } from '../core';
import { SEED_Y } from '../scene';

export interface CuttingStyle {
  /** Cutting length and thickness in px. */
  len: number;
  width: number;
  bark: string;
  /** Number of nodes drawn along the cutting. */
  nodes?: number;
}

export function cuttingInSoil(k: number, o: CuttingStyle): string {
  if (k < 0.02) return '';
  const { len, width, bark } = o;
  const nodes = o.nodes ?? 2;
  const top = -len / 2;
  let ring = '';
  for (let i = 1; i <= nodes; i++) {
    const y = top + (len * i) / (nodes + 1);
    ring += `M${f(-width / 2)} ${f(y)}Q0 ${f(y + 3)} ${f(width / 2)} ${f(y)}`;
  }
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(-12)" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    `<rect x="${f(-width / 2)}" y="${f(top)}" width="${f(width)}" height="${f(len)}" rx="${f(width * 0.22)}" fill="${bark}" stroke="${darken(bark, 0.4)}" stroke-width="1.2"/>` +
    `<path d="${ring}" fill="none" stroke="${darken(bark, 0.35)}" stroke-width="1.1" opacity=".75"/>` +
    `<ellipse cx="0" cy="${f(top)}" rx="${f(width / 2)}" ry="${f(width * 0.2)}" fill="#e9dcb4" stroke="${darken(bark, 0.4)}" stroke-width="1"/>` +
    `</g>`
  );
}
