/** Printable stage cards: the print button and the "hide names" switch used for sorting games. */
export function initCards(root: ParentNode = document): void {
  const cards = root.querySelector<HTMLElement>('[data-stage-cards]');
  if (!cards) return;
  const blind = root.querySelector<HTMLInputElement>('[data-blind]');
  const print = root.querySelector<HTMLElement>('[data-print]');
  blind?.addEventListener('change', () => cards.classList.toggle('is-blind', blind.checked));
  if (print) {
    // Printing needs scripting here, so the button only appears when it can work.
    print.hidden = false;
    print.addEventListener('click', () => window.print());
  }
}
