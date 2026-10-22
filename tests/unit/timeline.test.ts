import { describe, expect, it } from 'vitest';
import { FLOWERS } from '../../src/data';
import { STAGE_IDS } from '../../src/data/types';
import { buildTimeline, clamp01, positionAt, progressFor, stageIndexAt } from '../../src/lib/timelapse/timeline';
import { posterProgress } from '../../src/lib/timelapse/poster';

const sunflower = FLOWERS[0]!;

describe('buildTimeline', () => {
  it('rejects an empty stage list', () => {
    expect(() => buildTimeline([])).toThrow();
  });

  it.each(FLOWERS.map((f) => [f.id, f] as const))('%s: segments tile [0, 1] without gaps', (_id, flower) => {
    const t = buildTimeline(flower.stages);
    expect(t.segments).toHaveLength(flower.stages.length);
    expect(t.segments[0]!.start).toBe(0);
    expect(t.segments.at(-1)!.end).toBe(1);
    for (let i = 1; i < t.segments.length; i++) {
      expect(t.segments[i]!.start).toBeCloseTo(t.segments[i - 1]!.end, 9);
      expect(t.segments[i]!.end).toBeGreaterThan(t.segments[i]!.start);
    }
  });

  it('adds up the real-world day estimates', () => {
    const t = buildTimeline(sunflower.stages);
    expect(t.totalDaysMin).toBe(sunflower.stages.reduce((a, s) => a + s.days[0], 0));
    expect(t.totalDaysMax).toBe(sunflower.stages.reduce((a, s) => a + s.days[1], 0));
  });
});

describe('stage lookup', () => {
  const t = buildTimeline(sunflower.stages);

  it('maps the extremes to the first and last stage', () => {
    expect(stageIndexAt(t, 0)).toBe(0);
    expect(stageIndexAt(t, 1)).toBe(t.segments.length - 1);
  });

  it('clamps out-of-range and non-finite progress', () => {
    expect(clamp01(-3)).toBe(0);
    expect(clamp01(4)).toBe(1);
    expect(clamp01(Number.NaN)).toBe(0);
    expect(stageIndexAt(t, -1)).toBe(0);
    expect(stageIndexAt(t, 9)).toBe(t.segments.length - 1);
  });

  it('puts the exact boundary in the later stage', () => {
    const boundary = t.segments[3]!.start;
    expect(stageIndexAt(t, boundary)).toBe(3);
    expect(stageIndexAt(t, boundary - 1e-6)).toBe(2);
  });

  it('interpolates elapsed time inside a stage', () => {
    const seg = t.segments[2]!;
    const mid = positionAt(t, (seg.start + seg.end) / 2);
    expect(mid.index).toBe(2);
    expect(mid.local).toBeCloseTo(0.5, 6);
    expect(mid.elapsedMin).toBeCloseTo(seg.cumMinBefore + seg.daysMin / 2, 6);
    expect(mid.elapsedMax).toBeCloseTo(seg.cumMaxBefore + seg.daysMax / 2, 6);
  });

  it('progressFor round-trips with stageIndexAt', () => {
    for (const seg of t.segments) {
      expect(stageIndexAt(t, progressFor(t, seg.id, 0.5))).toBe(seg.index);
    }
    expect(progressFor(t, 'seed', -1)).toBe(0);
  });

  it('posterProgress lands inside full bloom', () => {
    const p = posterProgress(t);
    expect(t.segments[stageIndexAt(t, p)]!.id).toBe('full-bloom');
  });
});

describe('every species', () => {
  it.each(FLOWERS.map((f) => [f.id, f] as const))('%s uses known stage ids in the canonical order', (_id, flower) => {
    const order = flower.stages.map((s) => STAGE_IDS.indexOf(s.id));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });
});
