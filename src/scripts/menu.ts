/** Disclosure popover: button + panel with aria-expanded, Escape, outside click and focus return. */
export function initMenus(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-menu]').forEach((menu) => {
    const trigger = menu.querySelector<HTMLButtonElement>('[data-menu-trigger]');
    const panel = menu.querySelector<HTMLElement>('[data-menu-panel]');
    if (!trigger || !panel) return;

    const setOpen = (open: boolean, returnFocus = false) => {
      trigger.setAttribute('aria-expanded', String(open));
      panel.toggleAttribute('hidden', !open);
      if (open) panel.querySelector<HTMLElement>('a,button')?.focus({ preventScroll: true });
      else if (returnFocus) trigger.focus();
    };

    trigger.addEventListener('click', () => setOpen(panel.hasAttribute('hidden')));
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hasAttribute('hidden')) {
        e.stopPropagation();
        setOpen(false, true);
      }
    });
    document.addEventListener('click', (e) => {
      if (!panel.hasAttribute('hidden') && !menu.contains(e.target as Node)) setOpen(false);
    });
    // Close when focus leaves the menu (keyboard users tabbing on).
    menu.addEventListener('focusout', (e) => {
      const next = (e as FocusEvent).relatedTarget as Node | null;
      if (!panel.hasAttribute('hidden') && next && !menu.contains(next)) setOpen(false);
    });
    panel.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('a')) setOpen(false);
    });
  });
}
