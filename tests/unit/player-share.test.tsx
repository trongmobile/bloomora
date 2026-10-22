// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import TimeLapsePlayer from '../../src/components/timelapse/TimeLapsePlayer';
import type { PlayerProps } from '../../src/components/timelapse/types';
import { FLOWERS } from '../../src/data';
import { getDict } from '../../src/i18n';
import { buildPlayerProps } from '../../src/lib/player-props';

const lotus = FLOWERS.find((f) => f.id === 'lotus')!;
const SHARE = { flower: 'https://flowers.example.com/en/flowers/lotus/', momentBase: 'https://flowers.example.com/en/flowers/lotus/moment/' };
const props = (over: Partial<PlayerProps> = {}): PlayerProps => ({ ...buildPlayerProps(lotus, 'en', getDict('en'), '/art/lotus.svg', SHARE), ...over });
const root = () => document.querySelector<HTMLElement>('[data-player]')!;

beforeEach(() => {
  history.replaceState(null, '', '/');
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('opening on a shared stage', () => {
  it('starts on the poster at full bloom when nothing was asked for', () => {
    render(<TimeLapsePlayer {...props()} />);
    expect(root().dataset.stage).toBe('full-bloom');
  });

  it('opens on the stage given by the moment page and keeps the visitor in control afterwards', () => {
    render(<TimeLapsePlayer {...props({ initialStage: 'bud-development' })} />);
    expect(root().dataset.stage).toBe('bud-development');
    expect(root().dataset.status).toBe('paused');
    act(() => void fireEvent.click(screen.getByTestId('next-stage')));
    expect(root().dataset.stage).toBe('blooming');
  });

  it('opens on ?stage= from a shared link, and ignores an unknown stage', () => {
    history.replaceState(null, '', '/en/flowers/lotus/?stage=seedling#timelapse');
    render(<TimeLapsePlayer {...props()} />);
    expect(root().dataset.stage).toBe('seedling');
    cleanup();
    history.replaceState(null, '', '/en/flowers/lotus/?stage=nonsense');
    render(<TimeLapsePlayer {...props()} />);
    expect(root().dataset.stage).toBe('full-bloom');
  });

  it('plays on from the shared stage instead of restarting at the seed', () => {
    render(<TimeLapsePlayer {...props({ initialStage: 'blooming' })} />);
    act(() => void fireEvent.click(screen.getByTestId('play-toggle')));
    expect(root().dataset.status).toBe('playing');
    expect(root().dataset.stage).toBe('blooming');
  });
});

describe('save and share tools', () => {
  it('offers sharing this moment and saving an image, in the visitor language', () => {
    render(<TimeLapsePlayer {...props()} />);
    expect(screen.getByRole('group', { name: 'Save and share this moment' })).toBeTruthy();
    expect(screen.getByTestId('share-moment').textContent).toContain('Share this moment');
    expect(screen.getByTestId('save-image').textContent).toContain('Save vertical image');
  });

  it('hides the clip button where the browser cannot record a canvas', () => {
    render(<TimeLapsePlayer {...props()} />);
    expect(screen.queryByTestId('save-clip')).toBeNull();
  });

  it('shows the clip button where it can', () => {
    vi.stubGlobal('MediaRecorder', class {});
    (HTMLCanvasElement.prototype as unknown as { captureStream: () => void }).captureStream = () => {};
    render(<TimeLapsePlayer {...props()} />);
    expect(screen.getByTestId('save-clip')).toBeTruthy();
    delete (HTMLCanvasElement.prototype as unknown as { captureStream?: () => void }).captureStream;
  });

  it('shares a link to the stage being shown, not to the page', async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', { value: share, configurable: true });
    render(<TimeLapsePlayer {...props({ initialStage: 'bud-development' })} />);
    await act(async () => void fireEvent.click(screen.getByTestId('share-moment')));
    expect(share).toHaveBeenCalledOnce();
    expect(share.mock.calls[0]![0].url).toBe('https://flowers.example.com/en/flowers/lotus/moment/bud-development/');
    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
  });

  it('copies that link when the device has no share sheet', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
    document.body.insertAdjacentHTML('beforeend', '<div id="toast"></div>');
    render(<TimeLapsePlayer {...props({ initialStage: 'seedling' })} />);
    await act(async () => void fireEvent.click(screen.getByTestId('share-moment')));
    expect(writeText).toHaveBeenCalledWith('https://flowers.example.com/en/flowers/lotus/moment/seedling/');
    expect(document.getElementById('toast')!.textContent).toBe('Link to this moment copied');
  });
});

describe('compact (embedded) player', () => {
  it('drops the long notes and the keyboard hint but keeps the illustration disclaimer', () => {
    render(<TimeLapsePlayer {...props({ compact: true })} />);
    const notes = document.querySelector('.tl__notes')!;
    expect(notes.textContent).toContain('Illustrative simulation');
    expect(notes.textContent).not.toContain(lotus.text.en.timeNote);
    expect(notes.textContent).not.toContain('Shortcuts');
  });

  it('keeps everything in the normal player', () => {
    render(<TimeLapsePlayer {...props()} />);
    const notes = document.querySelector('.tl__notes')!;
    expect(notes.textContent).toContain(lotus.text.en.timeNote);
    expect(notes.textContent).toContain('Shortcuts');
  });
});
