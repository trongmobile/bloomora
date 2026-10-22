import { THEME_STORAGE_KEY } from '../config/site';

type Theme = 'light' | 'dark';

function current(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function apply(theme: Theme, persist: boolean): void {
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* storage unavailable: the choice just lasts for this page view */
    }
  }
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(theme === 'dark'));
  });
}

function hasStoredChoice(): boolean {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === 'light' || v === 'dark';
  } catch {
    return false;
  }
}

export function initTheme(): void {
  apply(current(), false);
  document.querySelectorAll<HTMLElement>('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => apply(current() === 'dark' ? 'light' : 'dark', true));
  });
  // Follow the OS setting live, unless the visitor has chosen explicitly.
  const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
  mq?.addEventListener('change', (e) => {
    if (!hasStoredChoice()) apply(e.matches ? 'dark' : 'light', false);
  });
}
