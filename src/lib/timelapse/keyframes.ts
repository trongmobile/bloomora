/**
 * Maps a position on the timeline to a continuous "biological state" that the
 * illustration renderers understand. These are visual keyframes, not biological
 * measurements — the illustration is an educational simulation.
 */
import { STAGE_IDS, type StageId } from '../../data/types';
import { clamp01, positionAt, type Timeline } from './timeline';

export interface BioState {
  /** Visibility of the seed / bulb in the soil. */
  seed: number;
  root: number;
  /** Stem / trunk height as a fraction of the mature plant. */
  stem: number;
  /** Foliage amount (number and size of leaves). */
  leaf: number;
  /** Bud size; 1 = fully developed, ready to open. */
  bud: number;
  /** 0 closed .. 1 fully open. */
  open: number;
  /** 0 fresh .. 1 fully wilted / petals fallen. */
  wilt: number;
  /** Seed head / fruit / hip development. */
  fruit: number;
}

export const START_STATE: BioState = {
  seed: 1,
  root: 0,
  stem: 0,
  leaf: 0,
  bud: 0,
  open: 0,
  wilt: 0,
  fruit: 0,
};

/** State at the END of each canonical stage. */
export const STAGE_END_STATE: Record<StageId, BioState> = {
  seed: { ...START_STATE, seed: 1 },
  germination: { ...START_STATE, seed: 0.85, root: 0.55, stem: 0.07 },
  seedling: { ...START_STATE, seed: 0.4, root: 0.75, stem: 0.26, leaf: 0.22 },
  vegetative: { ...START_STATE, seed: 0, root: 1, stem: 0.88, leaf: 1 },
  'bud-formation': { ...START_STATE, seed: 0, root: 1, stem: 0.96, leaf: 1, bud: 0.32 },
  'bud-development': { ...START_STATE, seed: 0, root: 1, stem: 1, leaf: 1, bud: 1 },
  blooming: { ...START_STATE, seed: 0, root: 1, stem: 1, leaf: 1, bud: 1, open: 0.55 },
  'full-bloom': { ...START_STATE, seed: 0, root: 1, stem: 1, leaf: 1, bud: 1, open: 1 },
  wilting: { ...START_STATE, seed: 0, root: 1, stem: 1, leaf: 0.9, bud: 1, open: 1, wilt: 1, fruit: 1 },
};

const KEYS = Object.keys(START_STATE) as (keyof BioState)[];

export function lerpState(a: BioState, b: BioState, t: number): BioState {
  const out = { ...a };
  for (const k of KEYS) out[k] = a[k] + (b[k] - a[k]) * t;
  return out;
}

/** The state at a given playback progress for a species' timeline. */
export function bioStateAt(timeline: Timeline, progress: number): BioState {
  const pos = positionAt(timeline, progress);
  const prev = pos.index === 0 ? START_STATE : STAGE_END_STATE[timeline.segments[pos.index - 1]!.id];
  const end = STAGE_END_STATE[pos.segment.id];
  return lerpState(prev, end, pos.local);
}

/**
 * Species-independent state part-way through one canonical stage. Used where there is no
 * species timeline to ask (quiz results, stage cards): the stage is the thing being shown.
 */
export function bioStateForStage(stageId: StageId, local = 0.6): BioState {
  const i = STAGE_IDS.indexOf(stageId);
  const prev = i <= 0 ? START_STATE : STAGE_END_STATE[STAGE_IDS[i - 1]!];
  return lerpState(prev, STAGE_END_STATE[stageId], clamp01(local));
}
