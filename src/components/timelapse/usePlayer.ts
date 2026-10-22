import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { createInitialState, createPlayerReducer } from '../../lib/timelapse/player';
import type { Timeline } from '../../lib/timelapse/timeline';

/** Seconds between stages when the user asked for reduced motion (at 1x). */
export const REDUCED_STEP_MS = 1800;

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

interface Options {
  poster: number;
  reducedMotion: boolean;
  /** Cap on state updates per second while animating. */
  maxFps?: number;
}

/**
 * Wires the pure player reducer to requestAnimationFrame.
 * With reduced motion the player steps stage by stage on a timer instead of animating continuously.
 */
export function usePlayer(timeline: Timeline, { poster, reducedMotion, maxFps = 30 }: Options) {
  const reducer = useMemo(() => createPlayerReducer(timeline), [timeline]);
  const [state, dispatch] = useReducer(reducer, poster, createInitialState);
  const frame = useRef(0);

  const playing = state.status === 'playing';
  const speed = state.speed;

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const minFrame = 1000 / maxFps;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      if (dt >= minFrame) {
        last = now;
        // Clamp so a background tab or long task never makes the plant jump ahead.
        dispatch({ type: 'tick', dtMs: Math.min(dt, 100) });
      }
      frame.current = requestAnimationFrame(loop);
    };
    frame.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame.current);
  }, [playing, reducedMotion, maxFps]);

  useEffect(() => {
    if (!playing || !reducedMotion) return;
    const id = window.setInterval(() => dispatch({ type: 'next-stage' }), REDUCED_STEP_MS / speed);
    return () => window.clearInterval(id);
  }, [playing, reducedMotion, speed]);

  return { state, dispatch };
}
