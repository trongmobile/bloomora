/** GoatCounter honours localStorage.skipgc = 't' (documented by GoatCounter) and then sends nothing. */
const KEY = 'skipgc';

function isOptedOut(): boolean {
  try {
    return localStorage.getItem(KEY) === 't';
  } catch {
    return false;
  }
}

function setOptedOut(value: boolean): void {
  try {
    if (value) localStorage.setItem(KEY, 't');
    else localStorage.removeItem(KEY);
  } catch {
    /* storage blocked: nothing to persist */
  }
}

const box = document.querySelector<HTMLElement>('[data-analytics-optout]');
if (box) {
  const button = box.querySelector<HTMLButtonElement>('[data-optout-button]');
  const status = box.querySelector<HTMLElement>('[data-optout-status]');
  const render = () => {
    const out = isOptedOut();
    if (button) button.textContent = out ? box.dataset.labelIn ?? '' : box.dataset.labelOut ?? '';
    if (status) status.textContent = out ? box.dataset.msgOut ?? '' : box.dataset.msgIn ?? '';
    button?.setAttribute('aria-pressed', String(out));
  };
  button?.addEventListener('click', () => {
    setOptedOut(!isOptedOut());
    render();
  });
  render();
}
