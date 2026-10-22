/**
 * Time-lapse timeline model.
 *
 * Maps a species' stage list (with real-world day estimates) onto a normalised
 * playback axis [0, 1]. Playback speed only changes how fast `progress` moves;
 * the biological estimates shown to the user always come from the data.
 */
import type { StageId, StageTiming } from '../../data/types';

export interface StageSegment {
  id: StageId;
  index: number;
  /** Normalised playback range. */
  start: number;
  end: number;
  /** Real-world estimate for this stage. */
  daysMin: number;
  daysMax: number;
  /** Cumulative real-world estimate before this stage starts. */
  cumMinBefore: number;
  cumMaxBefore: number;
}

export interface Timeline {
  segments: StageSegment[];
  totalDaysMin: number;
  totalDaysMax: number;
}

export interface StagePosition {
  index: number;
  segment: StageSegment;
  /** 0..1 progress inside the current stage. */
  local: number;
  /** Interpolated real-world elapsed time range (days) at this position. */
  elapsedMin: number;
  elapsedMax: number;
}

const EPS = 1e-9;

export function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : Number.isFinite(x) ? x : 0;
}

/** Default share of playback time for a stage: log-scaled so long stages dominate gently. */
export function defaultWeight(daysMin: number, daysMax: number): number {
  const mid = (daysMin + daysMax) / 2;
  return Math.max(1.4, Math.min(7, Math.log2(1 + mid) * 0.9 + 0.6));
}

export function buildTimeline(stages: readonly StageTiming[]): Timeline {
  if (stages.length === 0) throw new Error('A timeline needs at least one stage.');
  const weights = stages.map((s) => s.weight ?? defaultWeight(s.days[0], s.days[1]));
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let cursor = 0;
  let cumMin = 0;
  let cumMax = 0;
  const segments: StageSegment[] = stages.map((stage, index) => {
    const width = (weights[index] ?? 1) / totalWeight;
    const segment: StageSegment = {
      id: stage.id,
      index,
      start: cursor,
      end: index === stages.length - 1 ? 1 : cursor + width,
      daysMin: stage.days[0],
      daysMax: stage.days[1],
      cumMinBefore: cumMin,
      cumMaxBefore: cumMax,
    };
    cursor += width;
    cumMin += stage.days[0];
    cumMax += stage.days[1];
    return segment;
  });
  return { segments, totalDaysMin: cumMin, totalDaysMax: cumMax };
}

/** Index of the stage that owns `progress`. The last stage owns progress === 1. */
export function stageIndexAt(timeline: Timeline, progress: number): number {
  const p = clamp01(progress);
  const { segments } = timeline;
  for (let i = segments.length - 1; i >= 0; i--) {
    const seg = segments[i];
    if (seg && p + EPS >= seg.start) return i;
  }
  return 0;
}

export function positionAt(timeline: Timeline, progress: number): StagePosition {
  const p = clamp01(progress);
  const index = stageIndexAt(timeline, p);
  const segment = timeline.segments[index]!;
  const span = segment.end - segment.start;
  const local = span <= 0 ? 1 : clamp01((p - segment.start) / span);
  return {
    index,
    segment,
    local,
    elapsedMin: segment.cumMinBefore + local * segment.daysMin,
    elapsedMax: segment.cumMaxBefore + local * segment.daysMax,
  };
}

/** Normalised progress for a given stage and local fraction. */
export function progressFor(timeline: Timeline, stageId: StageId, local = 0): number {
  const seg = timeline.segments.find((s) => s.id === stageId);
  if (!seg) return 0;
  return seg.start + clamp01(local) * (seg.end - seg.start);
}
