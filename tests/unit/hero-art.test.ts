import { describe, expect, it } from 'vitest';
import { petalPath, spiralSeeds, spread } from '../../src/lib/hero-art';

describe('hero art geometry', () => {
  it('draws a closed petal that starts at its base and ends at its tip', () => {
    const d = petalPath(8, 84, 17);
    expect(d.startsWith('M0 -8C')).toBe(true);
    expect(d.endsWith('Z')).toBe(true);
    expect(d).toContain(' 0 -92C');
    expect(d).not.toMatch(/NaN|undefined/);
  });

  it('spreads angles evenly from the offset', () => {
    expect(spread(4)).toEqual([0, 90, 180, 270]);
    expect(spread(6, 30)).toEqual([30, 90, 150, 210, 270, 330]);
  });

  it('packs seeds outwards on a spiral without overlap', () => {
    const seeds = spiralSeeds(150, 2.1);
    expect(seeds).toHaveLength(150);
    expect(Math.hypot(seeds[149]!.x, seeds[149]!.y)).toBeLessThan(2.1 * Math.sqrt(150.5) + 0.01);
    const minGap = Math.min(...seeds.flatMap((a, i) => seeds.slice(i + 1).map((b) => Math.hypot(a.x - b.x, a.y - b.y))));
    expect(minGap).toBeGreaterThan(1.8);
  });

});
