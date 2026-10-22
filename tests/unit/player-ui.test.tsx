// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import TimeLapsePlayer from '../../src/components/timelapse/TimeLapsePlayer';
import { FlowerMedia, pickStageImage } from '../../src/components/timelapse/FlowerMedia';
import { REDUCED_STEP_MS } from '../../src/components/timelapse/usePlayer';
import type { PlayerProps } from '../../src/components/timelapse/types';
import { FLOWERS } from '../../src/data';
import { getDict } from '../../src/i18n';
import { buildPlayerProps } from '../../src/lib/player-props';
import { bioStateAt } from '../../src/lib/timelapse/keyframes';
import { buildTimeline } from '../../src/lib/timelapse/timeline';

const sunflower = FLOWERS.find((f) => f.id === 'sunflower')!;
const SHARE_URLS = { flower: 'https://bloomora.example/en/flowers/sunflower/', momentBase: 'https://bloomora.example/en/flowers/sunflower/moment/' };
const baseProps = (over: Partial<PlayerProps> = {}): PlayerProps => ({
  ...buildPlayerProps(sunflower, 'en', getDict('en'), '/art/sunflower.svg', SHARE_URLS),
  ...over,
});

let reducedMotion = false;
function stubMatchMedia() {
  window.matchMedia = ((query: string) => ({
    matches: query.includes('prefers-reduced-motion') ? reducedMotion : false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  reducedMotion = false;
  stubMatchMedia();
  vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance', 'setInterval', 'clearInterval', 'setTimeout', 'clearTimeout'] });
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const root = () => document.querySelector<HTMLElement>('[data-player]')!;
const attrs = () => ({
  status: root().dataset.status,
  progress: Number(root().dataset.progress),
  stage: root().dataset.stage,
  index: Number(root().dataset.stageIndex),
  speed: Number(root().dataset.speed),
});
const click = (el: Element) => act(() => void fireEvent.click(el));
const advance = (ms: number) => act(() => void vi.advanceTimersByTime(ms));
const label = (p: PlayerProps) => p.labels;

describe('TimeLapsePlayer', () => {
  it('hydrates onto the poster frame, paused, in full bloom', () => {
    render(<TimeLapsePlayer {...baseProps()} />);
    expect(root().dataset.hydrated).toBe('true');
    expect(attrs()).toMatchObject({ status: 'paused', stage: 'full-bloom', speed: 1 });
    expect(screen.getByRole('region', { name: /Sunflower/ })).toBeTruthy();
    expect(root().querySelector('svg')).not.toBeNull(); // live illustration after hydration
  });

  it('labels the simulation as illustrative and shows the estimate notes', () => {
    const props = baseProps();
    render(<TimeLapsePlayer {...props} />);
    expect(screen.getByText(label(props).illustrative)).toBeTruthy();
    expect(screen.getByText(props.timeNote)).toBeTruthy();
  });

  it('plays from the seed, advances while playing and pauses where it is', () => {
    const props = baseProps();
    render(<TimeLapsePlayer {...props} />);
    click(screen.getByTestId('play-toggle'));
    expect(attrs()).toMatchObject({ status: 'playing', progress: 0, stage: 'seed' });
    expect(screen.getByTestId('play-toggle').getAttribute('aria-label')).toBe(label(props).pause);

    advance(4200); // 10% of the 42 s cycle at 1x
    const mid = attrs().progress;
    expect(mid).toBeGreaterThanOrEqual(8);
    expect(mid).toBeLessThanOrEqual(12);

    click(screen.getByTestId('play-toggle'));
    expect(attrs().status).toBe('paused');
    expect(screen.getByTestId('play-toggle').getAttribute('aria-label')).toBe(label(props).play);
    advance(5000);
    expect(attrs().progress).toBe(mid);
  });

  it('restarts from the beginning and keeps playing', () => {
    render(<TimeLapsePlayer {...baseProps()} />);
    click(screen.getByTestId('play-toggle'));
    advance(10000);
    expect(attrs().progress).toBeGreaterThan(10);
    click(screen.getByTestId('restart'));
    expect(attrs()).toMatchObject({ status: 'playing', progress: 0, stage: 'seed' });
  });

  it('plays to the end and stops', () => {
    render(<TimeLapsePlayer {...baseProps()} />);
    click(screen.getByTestId('play-toggle'));
    click(screen.getByRole('button', { name: '8x' }));
    advance(8000);
    expect(attrs()).toMatchObject({ status: 'ended', progress: 100 });
    expect(screen.getByTestId('live').textContent).toBe(label(baseProps()).ended);
  });

  it('seeks with the timeline and updates the percentage, stage and elapsed time', () => {
    render(<TimeLapsePlayer {...baseProps()} />);
    const range = screen.getByTestId('timeline') as HTMLInputElement;
    act(() => void fireEvent.change(range, { target: { value: '500' } }));
    expect(attrs().progress).toBe(50);
    expect(screen.getByTestId('percent').textContent).toContain('50');
    expect(range.value).toBe('500');
    expect(range.getAttribute('aria-valuetext')).toMatch(/50/);
    const early = screen.getByTestId('elapsed').textContent;
    act(() => void fireEvent.change(range, { target: { value: '0' } }));
    expect(screen.getByTestId('elapsed').textContent).toBe('0 days');
    expect(early).not.toBe('0 days');
  });

  it('pauses while dragging the timeline and resumes afterwards', () => {
    render(<TimeLapsePlayer {...baseProps()} />);
    const range = screen.getByTestId('timeline');
    click(screen.getByTestId('play-toggle'));
    act(() => void fireEvent.pointerDown(range));
    expect(attrs().status).toBe('paused');
    act(() => void fireEvent.pointerUp(range));
    expect(attrs().status).toBe('playing');
  });

  it('moves between stages with next and previous', () => {
    render(<TimeLapsePlayer {...baseProps()} />);
    click(screen.getByTestId('restart'));
    click(screen.getByTestId('play-toggle')); // pause at 0
    expect(attrs()).toMatchObject({ index: 0, stage: 'seed' });
    click(screen.getByTestId('next-stage'));
    expect(attrs().index).toBe(1);
    click(screen.getByTestId('next-stage'));
    expect(attrs().index).toBe(2);
    click(screen.getByTestId('prev-stage'));
    expect(attrs().index).toBe(1);
    expect(screen.getByTestId('live').textContent).toMatch(/\d+%/);
  });

  it('jumps to a stage from the stage list', () => {
    const props = baseProps();
    render(<TimeLapsePlayer {...props} />);
    const list = screen.getByRole('list', { name: label(props).stagesNav });
    const buttons = within(list).getAllByRole('button');
    expect(buttons).toHaveLength(props.stages.length);
    click(buttons[3]!);
    expect(attrs().index).toBe(3);
  });

  it('shows the description of the current stage', () => {
    const props = baseProps();
    render(<TimeLapsePlayer {...props} />);
    click(screen.getByTestId('next-stage'));
    const text = props.stageTexts[attrs().index]!;
    expect(screen.getByTestId('stage-description').textContent).toContain(text.description);
    expect(screen.getByTestId('stage-name').textContent).toBe(text.name);
  });

  it('changes the playback speed and makes playback faster', () => {
    const props = baseProps();
    render(<TimeLapsePlayer {...props} />);
    for (const s of [0.5, 1, 2, 4, 8]) {
      click(screen.getByRole('button', { name: `${s}x` }));
      expect(attrs().speed).toBe(s);
      expect(screen.getByRole('button', { name: `${s}x` }).getAttribute('aria-pressed')).toBe('true');
    }
    click(screen.getByRole('button', { name: '1x' }));
    click(screen.getByTestId('play-toggle'));
    advance(2000);
    const at1 = attrs().progress;
    click(screen.getByTestId('restart'));
    click(screen.getByRole('button', { name: '4x' }));
    advance(2000);
    expect(attrs().progress).toBeGreaterThan(at1 * 3);
  });

  it('supports keyboard control on the stage', () => {
    render(<TimeLapsePlayer {...baseProps()} />);
    const stage = root().querySelector<HTMLElement>('.tl__stage')!;
    act(() => void fireEvent.keyDown(stage, { key: ' ' }));
    expect(attrs().status).toBe('playing');
    act(() => void fireEvent.keyDown(stage, { key: 'k' }));
    expect(attrs().status).toBe('paused');
    act(() => void fireEvent.keyDown(stage, { key: 'Home' }));
    expect(attrs().progress).toBe(0);
    act(() => void fireEvent.keyDown(stage, { key: 'ArrowRight', shiftKey: true }));
    expect(attrs().progress).toBe(10);
    act(() => void fireEvent.keyDown(stage, { key: ']' }));
    expect(attrs().index).toBeGreaterThan(0);
    act(() => void fireEvent.keyDown(stage, { key: '+' }));
    expect(attrs().speed).toBe(2);
    act(() => void fireEvent.keyDown(stage, { key: 'End' }));
    expect(attrs().status).toBe('ended');
  });

  it('exposes accessible names for every control', () => {
    const props = baseProps();
    render(<TimeLapsePlayer {...props} />);
    for (const name of [label(props).play, label(props).restart, label(props).prevStage, label(props).nextStage, label(props).fullscreen]) {
      expect(screen.getByRole('button', { name })).toBeTruthy();
    }
    expect(screen.getByRole('slider', { name: label(props).timeline })).toBeTruthy();
  });

  it('only announces progress while paused (no chatter during playback)', () => {
    render(<TimeLapsePlayer {...baseProps()} />);
    expect(screen.getByTestId('live').textContent).not.toBe('');
    click(screen.getByTestId('play-toggle'));
    expect(screen.getByTestId('live').textContent).toBe('');
  });

  it('toggles the CSS fullscreen fallback when the Fullscreen API is missing', () => {
    const props = baseProps();
    render(<TimeLapsePlayer {...props} />);
    expect(root().className).not.toContain('is-fullscreen');
    click(screen.getByRole('button', { name: label(props).fullscreen }));
    expect(root().className).toContain('is-fullscreen');
    click(screen.getByRole('button', { name: label(props).exitFullscreen }));
    expect(root().className).not.toContain('is-fullscreen');
  });

  it('works for every species', () => {
    for (const flower of FLOWERS) {
      const { unmount } = render(<TimeLapsePlayer {...buildPlayerProps(flower, 'vi', getDict('vi'), `/art/${flower.id}.svg`, SHARE_URLS)} />);
      expect(root().dataset.hydrated).toBe('true');
      expect(root().querySelector('svg')).not.toBeNull();
      unmount();
    }
  });
});

describe('reduced motion', () => {
  beforeEach(() => {
    reducedMotion = true;
    stubMatchMedia();
  });

  it('is detected and explained to the reader', () => {
    render(<TimeLapsePlayer {...baseProps()} />);
    expect(root().dataset.reducedMotion).toBe('true');
    expect(screen.getByTestId('reduced-note')).toBeTruthy();
  });

  it('steps from stage to stage instead of animating continuously', () => {
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame');
    render(<TimeLapsePlayer {...baseProps()} />);
    click(screen.getByTestId('play-toggle'));
    expect(attrs()).toMatchObject({ status: 'playing', index: 0 });
    advance(100);
    expect(attrs().index).toBe(0);
    advance(REDUCED_STEP_MS);
    expect(attrs().index).toBe(1);
    advance(REDUCED_STEP_MS);
    expect(attrs().index).toBe(2);
    // The progress only ever lands exactly on stage boundaries.
    const timeline = buildTimeline(baseProps().stages);
    expect(attrs().progress).toBe(Math.round(timeline.segments[2]!.start * 100));
    expect(rafSpy).not.toHaveBeenCalled();
    rafSpy.mockRestore();
  });
});

describe('FlowerMedia', () => {
  const timeline = buildTimeline(sunflower.stages);
  const bio = bioStateAt(timeline, 0.8);
  const labels = { mediaFallback: 'Image unavailable — showing the illustration.' };
  const common = { visual: sunflower.visual, bio, stageId: 'full-bloom' as const, progress: 0.8, idPrefix: 't', altText: 'A sunflower', posterSrc: '/art/sunflower.svg', labels };

  it('renders the static poster before hydration', () => {
    const { container } = render(createElement(FlowerMedia, { ...common, media: { type: 'svg' }, hydrated: false }));
    const img = container.querySelector('img')!;
    expect(img.getAttribute('src')).toBe('/art/sunflower.svg');
    expect(img.getAttribute('alt')).toBe('A sunflower');
    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders the live SVG after hydration', () => {
    const { container } = render(createElement(FlowerMedia, { ...common, media: { type: 'svg' }, hydrated: true }));
    expect(container.querySelector('svg')).not.toBeNull();
    expect(screen.queryByTestId('media-fallback')).toBeNull();
  });

  it('falls back to the SVG and says so when a stage image is missing', () => {
    const media = { type: 'images' as const, stages: { 'full-bloom': { src: '/missing/bloom.jpg', alt: 'Bloom' }, seed: { src: '/missing/seed.jpg', alt: 'Seed' } } };
    const { container } = render(createElement(FlowerMedia, { ...common, media, hydrated: true }));
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBe(2);
    expect(container.querySelector('svg')).toBeNull();
    act(() => void fireEvent.error(imgs[0]!));
    expect(container.querySelector('svg')).not.toBeNull();
    expect(screen.getByTestId('media-fallback').textContent).toBe(labels.mediaFallback);
  });

  it('crossfades stage images, with only the current one exposed to assistive tech', () => {
    const media = { type: 'images' as const, stages: { seed: { src: '/a.jpg', alt: 'Seed' }, 'full-bloom': { src: '/b.jpg', alt: 'Bloom' } } };
    const { container } = render(createElement(FlowerMedia, { ...common, media, hydrated: true }));
    const active = container.querySelector('img[data-active="true"]')!;
    expect(active.getAttribute('src')).toBe('/b.jpg');
    expect(active.getAttribute('alt')).toBe('Bloom');
    expect(container.querySelector('img[data-active="false"]')!.getAttribute('aria-hidden')).toBe('true');
  });

  it('falls back to the SVG when a video fails to load, and lazy-loads it first', () => {
    class IO {
      observe() {}
      disconnect() {}
      constructor(_cb: IntersectionObserverCallback) {}
    }
    vi.stubGlobal('IntersectionObserver', IO);
    const media = { type: 'video' as const, src: '/clip.mp4', mime: 'video/mp4', durationSec: 20 };
    const { container } = render(createElement(FlowerMedia, { ...common, media, hydrated: true }));
    const video = container.querySelector('video')!;
    expect(video.getAttribute('src')).toBeNull(); // not attached until visible
    expect(video.getAttribute('preload')).toBe('none');
    act(() => void fireEvent.error(video));
    expect(container.querySelector('svg')).not.toBeNull();
    expect(screen.getByTestId('media-fallback')).toBeTruthy();
    vi.unstubAllGlobals();
  });

  it('picks the nearest earlier stage image', () => {
    const stages = { seed: { src: 's', alt: 's' }, 'bud-formation': { src: 'b', alt: 'b' } };
    expect(pickStageImage(stages, 'seedling')?.src).toBe('s');
    expect(pickStageImage(stages, 'blooming')?.src).toBe('b');
    expect(pickStageImage({ 'full-bloom': { src: 'f', alt: 'f' } }, 'seed')?.src).toBe('f');
  });
});
