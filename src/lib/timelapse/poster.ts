import { progressFor, type Timeline } from './timeline';

/** Playback position used for the static poster: the middle of full bloom. */
export function posterProgress(timeline: Timeline): number {
  const hasFull = timeline.segments.some((s) => s.id === 'full-bloom');
  return hasFull ? progressFor(timeline, 'full-bloom', 0.5) : 0.8;
}
