let timer: number | undefined;

/** Shows a short status message in the global live region (#toast). */
export function showToast(message: string): void {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.setAttribute('data-show', 'true');
  window.clearTimeout(timer);
  timer = window.setTimeout(() => el.setAttribute('data-show', 'false'), 2600);
}
