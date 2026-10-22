import { describe, expect, it } from 'vitest';
import { FLOWERS } from '../../src/data';
import { BASE_DURATION_MS, SPEEDS, createInitialState, createPlayerReducer, isSpeed, type PlayerAction, type PlayerState } from '../../src/lib/timelapse/player';
import { buildTimeline, stageIndexAt } from '../../src/lib/timelapse/timeline';

const timeline = buildTimeline(FLOWERS[0]!.stages);
const reduce = createPlayerReducer(timeline);
const run = (state: PlayerState, ...actions: PlayerAction[]) => actions.reduce(reduce, state);

describe('play / pause / restart', () => {
  it('starts paused on the poster frame', () => {
    const s = createInitialState(0.8);
    expect(s).toMatchObject({ status: 'paused', started: false, speed: 1, progress: 0.8 });
  });

  it('the first play restarts from the seed', () => {
    const s = run(createInitialState(0.8), { type: 'play' });
    expect(s).toMatchObject({ status: 'playing', progress: 0, started: true });
  });

  it('pause freezes and resume continues from the same place', () => {
    let s = run(createInitialState(), { type: 'play' }, { type: 'tick', dtMs: 4200 });
    const at = s.progress;
    expect(at).toBeGreaterThan(0);
    s = run(s, { type: 'pause' }, { type: 'tick', dtMs: 5000 });
    expect(s.progress).toBe(at);
    expect(s.status).toBe('paused');
    s = run(s, { type: 'play' });
    expect(s).toMatchObject({ status: 'playing', progress: at });
  });

  it('toggle switches between play and pause', () => {
    let s = run(createInitialState(), { type: 'toggle' });
    expect(s.status).toBe('playing');
    s = run(s, { type: 'toggle' });
    expect(s.status).toBe('paused');
  });

  it('restart goes to 0 and plays', () => {
    const s = run(createInitialState(), { type: 'play' }, { type: 'tick', dtMs: 20000 }, { type: 'restart' });
    expect(s).toMatchObject({ progress: 0, status: 'playing' });
  });

  it('ends at 1 and playing again restarts', () => {
    let s = run(createInitialState(), { type: 'play' }, { type: 'tick', dtMs: BASE_DURATION_MS * 2 });
    expect(s).toMatchObject({ progress: 1, status: 'ended' });
    s = run(s, { type: 'play' });
    expect(s).toMatchObject({ progress: 0, status: 'playing' });
  });
});

describe('seeking and stages', () => {
  it('seek clamps and keeps the playing state', () => {
    expect(run(createInitialState(), { type: 'seek', progress: -4 }).progress).toBe(0);
    const playing = run(createInitialState(), { type: 'play' }, { type: 'seek', progress: 0.4 });
    expect(playing).toMatchObject({ progress: 0.4, status: 'playing' });
    expect(run(createInitialState(), { type: 'seek', progress: 7 })).toMatchObject({ progress: 1, status: 'ended' });
  });

  it('next-stage jumps to the start of the following stage', () => {
    const s = run(createInitialState(), { type: 'seek', progress: 0.01 }, { type: 'next-stage' });
    expect(s.progress).toBe(timeline.segments[1]!.start);
    expect(stageIndexAt(timeline, s.progress)).toBe(1);
  });

  it('next-stage from the last stage finishes', () => {
    const s = run(createInitialState(), { type: 'seek', progress: 0.99 }, { type: 'next-stage' });
    expect(s).toMatchObject({ progress: 1, status: 'ended' });
  });

  it('prev-stage first rewinds to the stage start, then to the previous stage', () => {
    const seg = timeline.segments[4]!;
    const mid = (seg.start + seg.end) / 2;
    let s = run(createInitialState(), { type: 'seek', progress: mid }, { type: 'prev-stage' });
    expect(s.progress).toBe(seg.start);
    s = run(s, { type: 'prev-stage' });
    expect(s.progress).toBe(timeline.segments[3]!.start);
  });

  it('prev-stage on the first stage stays at 0', () => {
    expect(run(createInitialState(), { type: 'seek', progress: 0.002 }, { type: 'prev-stage' }).progress).toBe(0);
  });

  it('nudge moves by a delta', () => {
    expect(run(createInitialState(0.5), { type: 'nudge', delta: 0.1 }).progress).toBeCloseTo(0.6, 9);
    expect(run(createInitialState(0.05), { type: 'nudge', delta: -0.1 }).progress).toBe(0);
  });
});

describe('speed', () => {
  it('offers 0.5, 1, 2, 4 and 8', () => {
    expect([...SPEEDS]).toEqual([0.5, 1, 2, 4, 8]);
    expect(isSpeed(4)).toBe(true);
    expect(isSpeed(3)).toBe(false);
  });

  it('scales how far a tick moves', () => {
    const at = (speed: (typeof SPEEDS)[number]) =>
      run(createInitialState(), { type: 'play' }, { type: 'set-speed', speed }, { type: 'tick', dtMs: 1000 }).progress;
    expect(at(1)).toBeCloseTo(1000 / BASE_DURATION_MS, 9);
    expect(at(2)).toBeCloseTo(at(1) * 2, 9);
    expect(at(8)).toBeCloseTo(at(1) * 8, 9);
    expect(at(0.5)).toBeCloseTo(at(1) / 2, 9);
  });

  it('faster / slower stay within the available speeds', () => {
    let s = createInitialState();
    for (let i = 0; i < 10; i++) s = run(s, { type: 'faster' });
    expect(s.speed).toBe(8);
    for (let i = 0; i < 10; i++) s = run(s, { type: 'slower' });
    expect(s.speed).toBe(0.5);
  });

  it('a tick while paused does nothing', () => {
    const s = createInitialState(0.3);
    expect(reduce(s, { type: 'tick', dtMs: 9000 })).toBe(s);
  });
});
