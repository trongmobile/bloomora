import { showToast } from './toast';

async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  // Fallback for insecure contexts and older Safari.
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
  document.body.appendChild(area);
  area.select();
  area.setSelectionRange(0, text.length);
  let ok: boolean;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  area.remove();
  return ok;
}

export function initShare(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-share]').forEach((box) => {
    const url = box.dataset.url ?? location.href;
    const title = box.dataset.title ?? document.title;
    const text = box.dataset.text ?? '';
    const msgCopied = box.dataset.msgCopied ?? 'Copied';
    const msgFailed = box.dataset.msgFailed ?? 'Copy failed';
    const msgShared = box.dataset.msgShared ?? '';

    const nativeBtn = box.querySelector<HTMLButtonElement>('[data-share-native]');
    if (nativeBtn && typeof navigator.share === 'function') {
      nativeBtn.hidden = false;
      nativeBtn.addEventListener('click', async () => {
        try {
          await navigator.share({ title, text, url });
          if (msgShared) showToast(msgShared);
        } catch {
          /* user dismissed the sheet: nothing to report */
        }
      });
    }

    box.querySelector<HTMLButtonElement>('[data-share-copy]')?.addEventListener('click', async () => {
      showToast((await copyText(url)) ? msgCopied : msgFailed);
    });
  });
}
