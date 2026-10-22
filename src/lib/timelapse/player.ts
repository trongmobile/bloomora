/**
 * Player state machine for the time-lapse. Pure and framework-free so every
 * control (play/pause, restart, seek, stage jumps, speed) can be unit-tested.
 */
import { clamp01, stageIndexAt, type Timeline } from './timeline';

export const SPEEDS = [0.5, 1, 2, 4, 8] as const;
export type Speed = (typeof SPEEDS)[number];

/** Wall-clock duration of the whole growth cycle at 1x. */
export const BASE_DURATION_MS = 42_000;

export type PlayerStatus = 'paused' | 'playing' | 'ended';

export interface PlayerState {
  progress: number;
  status: PlayerStatus;
  speed: Speed;
  /** False while the poster frame is shown; the first Play starts from the seed. */
  started: boolean;
}

export type PlayerAction =
  | { type: 'play' }
  | { type: 'pause' }
  | { type: 'toggle' }
  | { type: 'restart' }
  | { type: 'seek'; progress: number }
  | { type: 'nudge'; delta: number }
  | { type: 'next-stage' }
  | { type: 'prev-stage' }
  | { type: 'set-speed'; speed: Speed }
  | { type: 'faster' }
  | { type: 'slower' }
  | { type: 'tick'; dtMs: number };

export function createInitialState(posterProgress = 0): PlayerState {
  return { progress: clamp01(posterProgress), status: 'paused', speed: 1, started: false };
}

export function isSpeed(value: number): value is Speed {
  return (SPEEDS as readonly number[]).includes(value);
}

function settle(state: PlayerState, progress: number, wantPlaying: boolean): PlayerState {
  const p = clamp01(progress);
  if (p >= 1) return { ...state, progress: 1, status: 'ended', started: true };
  return { ...state, progress: p, status: wantPlaying ? 'playing' : 'paused', started: true };
}

export function createPlayerReducer(timeline: Timeline) {
  const segs = timeline.segments;
  return function reducer(state: PlayerState, action: PlayerAction): PlayerState {
    switch (action.type) {
      case 'play': {
        if (!state.started || state.progress >= 1) return settle(state, 0, true);
        return { ...state, status: 'playing' };
      }
      case 'pause':
        return state.status === 'playing' ? { ...state, status: 'paused' } : state;
      case 'toggle':
        return reducer(state, { type: state.status === 'playing' ? 'pause' : 'play' });
      case 'restart':
        return settle(state, 0, true);
      case 'seek':
        return settle(state, action.progress, state.status === 'playing');
      case 'nudge':
        return settle(state, state.progress + action.delta, state.status === 'playing');
      case 'next-stage': {
        const idx = stageIndexAt(timeline, state.progress);
        const next = segs[idx + 1];
        return settle(state, next ? next.start : 1, state.status === 'playing');
      }
      case 'prev-stage': {
        const idx = stageIndexAt(timeline, state.progress);
        const seg = segs[idx]!;
        const span = seg.end - seg.start;
        const local = span > 0 ? (state.progress - seg.start) / span : 0;
        const target = local > 0.05 || idx === 0 ? seg.start : segs[idx - 1]!.start;
        return settle(state, target, state.status === 'playing');
      }
      case 'set-speed':
        return { ...state, speed: action.speed };
      case 'faster': {
        const i = SPEEDS.indexOf(state.speed);
        return { ...state, speed: SPEEDS[Math.min(SPEEDS.length - 1, i + 1)]! };
      }
      case 'slower': {
        const i = SPEEDS.indexOf(state.speed);
        return { ...state, speed: SPEEDS[Math.max(0, i - 1)]! };
      }
      case 'tick': {
        if (state.status !== 'playing') return state;
        const delta = (action.dtMs / BASE_DURATION_MS) * state.speed;
        return settle(state, state.progress + delta, true);
      }
      default:
        return state;
    }
  };
}
