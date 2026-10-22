// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initMenus } from '../../src/scripts/menu';
import { initShare } from '../../src/scripts/share';
import { initTheme } from '../../src/scripts/theme';
import { showToast } from '../../src/scripts/toast';
import { THEME_STORAGE_KEY } from '../../src/config/site';

const flush = () => new Promise((r) => setTimeout(r, 0));

function stubMatchMedia(dark = false) {
  const listeners: ((e: { matches: boolean }) => void)[] = [];
  window.matchMedia = ((q: string) => ({
    matches: q.includes('dark') ? dark : false,
    media: q,
    addEventListener: (_: string, cb: (e: { matches: boolean }) => void) => listeners.push(cb),
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia;
  return listeners;
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  document.body.innerHTML = '';
});
afterEach(() => vi.restoreAllMocks());

describe('theme toggle', () => {
  it('toggles light/dark, remembers the choice and reflects it in aria-pressed', () => {
    stubMatchMedia(false);
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.innerHTML = '<button data-theme-toggle aria-pressed="false">theme</button>';
    initTheme();
    const btn = document.querySelector<HTMLElement>('[data-theme-toggle]')!;
    btn.click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    btn.click();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(btn.getAttribute('aria-pressed')).toBe('false');
  });

  it('follows the OS setting until the visitor chooses', () => {
    const listeners = stubMatchMedia(false);
    document.documentElement.setAttribute('data-theme', 'light');
    initTheme();
    listeners.forEach((cb) => cb({ matches: true }));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    listeners.forEach((cb) => cb({ matches: true }));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark'); // unchanged: explicit choice wins
  });

  it('still toggles when storage is blocked', () => {
    stubMatchMedia(false);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.innerHTML = '<button data-theme-toggle>t</button>';
    initTheme();
    expect(() => document.querySelector<HTMLElement>('[data-theme-toggle]')!.click()).not.toThrow();
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

describe('menu', () => {
  const html = `<div data-menu><button data-menu-trigger aria-expanded="false">Menu</button>
    <nav data-menu-panel hidden><a href="/a">A</a><a href="/b">B</a></nav></div><button id="outside">x</button>`;

  it('opens, closes on Escape with focus return, and closes on outside click', () => {
    document.body.innerHTML = html;
    initMenus();
    const trigger = document.querySelector<HTMLButtonElement>('[data-menu-trigger]')!;
    const panel = document.querySelector<HTMLElement>('[data-menu-panel]')!;
    trigger.click();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(panel.hidden).toBe(false);
    expect(document.activeElement).toBe(panel.querySelector('a'));
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(panel.hidden).toBe(true);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
    trigger.click();
    document.getElementById('outside')!.click();
    expect(panel.hidden).toBe(true);
  });

  it('closes after choosing a link', () => {
    document.body.innerHTML = html;
    initMenus();
    document.querySelector<HTMLElement>('[data-menu-trigger]')!.click();
    const link = document.querySelector<HTMLAnchorElement>('[data-menu-panel] a')!;
    link.addEventListener('click', (e) => e.preventDefault());
    link.click();
    expect(document.querySelector<HTMLElement>('[data-menu-panel]')!.hidden).toBe(true);
  });
});

describe('share', () => {
  const html = `<div id="toast"></div><div data-share data-url="https://flowers.example.com/en/flowers/rose/" data-title="Rose" data-msg-copied="Link copied" data-msg-failed="Copy failed" data-msg-shared="Shared">
    <button data-share-native hidden>share</button><button data-share-copy>copy</button></div>`;

  it('copies the canonical URL (not the current location) and confirms with a toast', async () => {
    document.body.innerHTML = html;
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
    initShare();
    document.querySelector<HTMLElement>('[data-share-copy]')!.click();
    await flush();
    expect(writeText).toHaveBeenCalledWith('https://flowers.example.com/en/flowers/rose/');
    expect(document.getElementById('toast')!.textContent).toBe('Link copied');
    expect(document.getElementById('toast')!.getAttribute('data-show')).toBe('true');
  });

  it('falls back to execCommand when the Clipboard API is unavailable', async () => {
    document.body.innerHTML = html;
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
    const exec = vi.fn().mockReturnValue(true);
    (document as unknown as { execCommand: unknown }).execCommand = exec;
    initShare();
    document.querySelector<HTMLElement>('[data-share-copy]')!.click();
    await flush();
    expect(exec).toHaveBeenCalledWith('copy');
    expect(document.getElementById('toast')!.textContent).toBe('Link copied');
    expect(document.querySelector('textarea')).toBeNull(); // temporary field cleaned up
  });

  it('reports a failed copy', async () => {
    document.body.innerHTML = html;
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true });
    (document as unknown as { execCommand: unknown }).execCommand = vi.fn().mockReturnValue(false);
    initShare();
    document.querySelector<HTMLElement>('[data-share-copy]')!.click();
    await flush();
    expect(document.getElementById('toast')!.textContent).toBe('Copy failed');
  });

  it('reveals the native share button only when the Web Share API exists, and shares the canonical URL', async () => {
    document.body.innerHTML = html;
    Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
    initShare();
    expect(document.querySelector<HTMLElement>('[data-share-native]')!.hidden).toBe(true);

    document.body.innerHTML = html;
    const share = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', { value: share, configurable: true });
    initShare();
    const native = document.querySelector<HTMLElement>('[data-share-native]')!;
    expect(native.hidden).toBe(false);
    native.click();
    await flush();
    expect(share).toHaveBeenCalledWith({ title: 'Rose', text: '', url: 'https://flowers.example.com/en/flowers/rose/' });
  });

  it('ignores a dismissed share sheet', async () => {
    document.body.innerHTML = html;
    Object.defineProperty(navigator, 'share', { value: vi.fn().mockRejectedValue(new DOMException('cancelled', 'AbortError')), configurable: true });
    initShare();
    document.querySelector<HTMLElement>('[data-share-native]')!.click();
    await flush();
    expect(document.getElementById('toast')!.textContent).toBe('');
  });
});

describe('toast', () => {
  it('shows a message and hides it again', () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="toast"></div>';
    showToast('Hello');
    const el = document.getElementById('toast')!;
    expect(el.textContent).toBe('Hello');
    expect(el.getAttribute('data-show')).toBe('true');
    vi.advanceTimersByTime(3000);
    expect(el.getAttribute('data-show')).toBe('false');
    vi.useRealTimers();
  });
  it('does nothing without a toast element', () => {
    document.body.innerHTML = '';
    expect(() => showToast('x')).not.toThrow();
  });
});
