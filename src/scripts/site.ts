import { LANG_STORAGE_KEY } from '../config/site';
import { initEmbedCode } from './embed-code';
import { initMenus } from './menu';
import { initShare } from './share';
import { initTheme } from './theme';

initTheme();
initMenus();
initShare();
initEmbedCode();

// Remember an explicit language choice so the gateway page can honour it next time.
document.querySelectorAll<HTMLElement>('[data-lang-switch]').forEach((link) => {
  link.addEventListener('click', () => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, link.dataset.langSwitch ?? '');
    } catch {
      /* ignore */
    }
  });
});
