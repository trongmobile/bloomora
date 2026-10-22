import { FLOWER_LIST_PAGE_SIZE } from '../config/site';
import { fmt } from '../i18n';
import {
  EMPTY_FILTERS,
  filterItems,
  hasActiveFilters,
  parseFilterQuery,
  serializeFilterQuery,
  splitList,
  type FilterableItem,
  type FilterState,
} from '../lib/filter';

interface Card extends FilterableItem {
  el: HTMLElement;
}

const KEYS = ['q', 'group', 'color', 'season', 'speed'] as const;

function init(root: HTMLElement): void {
  const grid = root.querySelector<HTMLElement>('[data-flower-grid]');
  if (!grid) throw new Error('flower grid not found');
  const cards: Card[] = [...grid.querySelectorAll<HTMLElement>('[data-flower-card]')].map((el) => {
    const { haystack, group, speed } = el.dataset;
    if (haystack === undefined || !group || !speed) throw new Error('card is missing filter data');
    return { el, haystack, group, speed, colors: splitList(el.dataset.colors), seasons: splitList(el.dataset.seasons) };
  });

  const pageSize = Number(root.dataset.pageSize) || FLOWER_LIST_PAGE_SIZE;
  const controls = new Map<(typeof KEYS)[number], HTMLInputElement | HTMLSelectElement>();
  for (const key of KEYS) {
    const el = root.querySelector<HTMLInputElement | HTMLSelectElement>(`[data-filter="${key}"]`);
    if (el) controls.set(key, el);
  }
  const countEl = root.querySelector<HTMLElement>('[data-results-count]');
  const emptyEl = root.querySelector<HTMLElement>('[data-empty]');
  const moreBtn = root.querySelector<HTMLButtonElement>('[data-load-more]');
  const clearSearch = root.querySelector<HTMLButtonElement>('[data-clear-search]');
  const resetBtns = root.querySelectorAll<HTMLElement>('[data-reset]');

  let state: FilterState = parseFilterQuery(location.search);
  let limit = pageSize;

  const readControls = (): FilterState => {
    const next = { ...EMPTY_FILTERS };
    for (const [key, el] of controls) next[key] = el.value;
    return next;
  };
  const writeControls = () => {
    for (const [key, el] of controls) {
      // Ignore values that are not in the select (e.g. a hand-edited URL).
      if (el instanceof HTMLSelectElement && ![...el.options].some((o) => o.value === state[key])) state[key] = '';
      el.value = state[key];
    }
  };

  const render = () => {
    const matches = new Set(filterItems(cards, state));
    let shown = 0;
    for (const card of cards) {
      const show = matches.has(card) && shown < limit;
      if (show) shown++;
      card.el.hidden = !show;
    }
    const total = matches.size;
    if (countEl) {
      countEl.textContent =
        total === 0 ? countEl.dataset.none ?? '' : fmt(countEl.dataset.tpl ?? '{shown}/{n}', { shown, n: total });
    }
    if (emptyEl) emptyEl.hidden = total !== 0;
    grid.hidden = total === 0;
    if (moreBtn) moreBtn.hidden = total <= limit;
    resetBtns.forEach((b) => {
      if (b.hasAttribute('data-reset-main')) b.hidden = !hasActiveFilters(state);
    });
    if (clearSearch) clearSearch.hidden = state.q === '';
    root.dataset.visible = String(shown);
    root.dataset.total = String(total);
  };

  const sync = () => {
    const url = `${location.pathname}${serializeFilterQuery(state)}${location.hash}`;
    history.replaceState(null, '', url);
  };

  const onChange = () => {
    state = readControls();
    limit = pageSize;
    sync();
    render();
  };

  let timer: number | undefined;
  for (const [key, el] of controls) {
    if (key === 'q') {
      el.addEventListener('input', () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(onChange, 120);
      });
    } else {
      el.addEventListener('change', onChange);
    }
  }
  clearSearch?.addEventListener('click', () => {
    const input = controls.get('q');
    if (input) {
      input.value = '';
      input.focus();
    }
    onChange();
  });
  resetBtns.forEach((b) =>
    b.addEventListener('click', () => {
      for (const el of controls.values()) el.value = '';
      onChange();
    }),
  );
  moreBtn?.addEventListener('click', () => {
    const before = limit;
    limit += pageSize;
    render();
    // Move focus to the first newly revealed card's link so keyboard users continue from there.
    const firstNew = cards.filter((c) => !c.el.hidden)[before];
    firstNew?.el.querySelector<HTMLElement>('a')?.focus();
  });

  root.querySelector('[data-reload]')?.addEventListener('click', () => location.reload());

  writeControls();
  render();
  root.dataset.filtersReady = 'true';
}

const root = document.querySelector<HTMLElement>('[data-flower-list]');
if (root) {
  try {
    init(root);
  } catch (err) {
    console.error('Flower filters failed to start', err);
    root.querySelector<HTMLElement>('[data-error]')?.removeAttribute('hidden');
    root.querySelector('[data-reload]')?.addEventListener('click', () => location.reload());
    root.dataset.filtersReady = 'error';
  }
}
