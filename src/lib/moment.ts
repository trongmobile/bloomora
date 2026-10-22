/**
 * "A moment" is one stage of one species, shown at a fixed point inside the stage. The same
 * state feeds the static poster, the share landing page, the OG image, the stage cards and the
 * quiz result, so they always show the same picture.
 */
import type { FlowerData, StageId } from '../data/types';
import { renderFlowerSvg } from './art';
import { bioStateAt, bioStateForStage, type BioState } from './timelapse/keyframes';
import { buildTimeline, progressFor } from './timelapse/timeline';

/** How far into a stage the picture is taken (0 = start, 1 = end). */
export const MOMENT_LOCAL = 0.6;

export function hasStage(flower: FlowerData, stage: StageId): boolean {
  return flower.stages.some((s) => s.id === stage);
}

/** Playback position of a stage in this species' own timeline, or undefined if it skips the stage. */
export function momentProgress(flower: FlowerData, stage: StageId): number | undefined {
  return hasStage(flower, stage) ? progressFor(buildTimeline(flower.stages), stage, MOMENT_LOCAL) : undefined;
}

export function momentBioState(flower: FlowerData, stage: StageId): BioState {
  const p = momentProgress(flower, stage);
  return p === undefined ? bioStateForStage(stage, MOMENT_LOCAL) : bioStateAt(buildTimeline(flower.stages), p);
}

export function momentSvg(flower: FlowerData, stage: StageId, idPrefix: string): string {
  return renderFlowerSvg(flower.visual, momentBioState(flower, stage), { idPrefix });
}
