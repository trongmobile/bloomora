/** Geometry helpers for the hero emblems (src/components/site/hero). Pure functions so they can be unit-tested. */

const round = (n: number): number => +n.toFixed(2);

/** Petal outline pointing up (-y), starting `base` from the origin and `length` long. */
export function petalPath(base: number, length: number, width: number): string {
  const tip = base + length;
  const shoulder = round(-base - length * 0.3);
  const upper = round(-base - length * 0.78);
  const inner = round(width * 0.85);
  return `M0 ${-base}C${-width} ${shoulder} ${-inner} ${upper} 0 ${-tip}C${inner} ${upper} ${width} ${shoulder} 0 ${-base}Z`;
}

/** `count` angles (degrees) evenly spread round a circle, starting at `offset`. */
export function spread(count: number, offset = 0): number[] {
  return Array.from({ length: count }, (_, i) => round(offset + (360 / count) * i));
}

/** Points packed on a golden-angle spiral, like the seeds of a sunflower head. */
export function spiralSeeds(count: number, spacing: number): { x: number; y: number }[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i * 137.508 * Math.PI) / 180;
    const radius = spacing * Math.sqrt(i + 0.5);
    return { x: round(radius * Math.cos(angle)), y: round(radius * Math.sin(angle)) };
  });
}
