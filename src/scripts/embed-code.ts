import { embedSnippet, type EmbedInput, type EmbedTheme } from '../lib/embed';
import { copyText } from './share';
import { showToast } from './toast';

/** Theme picker and copy button for the "embed this time-lapse" box on a species page. */
export function initEmbedCode(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-embed-code]').forEach((box) => {
    if (!box.dataset.embedInput) return;
    const input = JSON.parse(box.dataset.embedInput) as EmbedInput;
    const select = box.querySelector<HTMLSelectElement>('[data-embed-theme]');
    const text = box.querySelector<HTMLTextAreaElement>('[data-embed-text]');
    if (!text) return;
    const update = (): void => {
      const value = select?.value;
      const theme: EmbedTheme = value === 'light' || value === 'dark' ? value : 'auto';
      text.value = embedSnippet({ ...input, theme });
    };
    select?.addEventListener('change', update);
    text.addEventListener('focus', () => text.select());
    box.querySelector('[data-embed-copy]')?.addEventListener('click', async () => {
      showToast((await copyText(text.value)) ? (box.dataset.msgCopied ?? '') : (box.dataset.msgFailed ?? ''));
    });
    update();
  });
}
