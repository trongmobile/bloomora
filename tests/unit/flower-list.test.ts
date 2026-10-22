// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FLOWER_LIST_PAGE_SIZE } from '../../src/config/site';

function build(count: number, pageSizeAttr = '') {
  const cards = Array.from(
    { length: count },
    (_, i) =>
      `<li data-flower-card data-haystack="flower${i}" data-group="annual" data-colors="red" data-seasons="spring" data-speed="fast"><a href="#f${i}">flower ${i}</a></li>`,
  ).join('');
  document.body.innerHTML = `<div data-flower-list ${pageSizeAttr}>
    <p data-results-count data-tpl="{shown}/{n}" data-none="none"></p>
    <ul data-flower-grid>${cards}</ul>
    <div data-empty hidden></div>
    <button data-load-more hidden>more</button>
  </div>`;
}

async function start() {
  vi.resetModules();
  await import('../../src/scripts/flower-filters');
}

const shown = () => document.querySelectorAll('[data-flower-card]:not([hidden])').length;
const more = () => document.querySelector<HTMLButtonElement>('[data-load-more]')!;

beforeEach(() => {
  history.replaceState(null, '', '/vi/flowers/');
});

describe('flower list paging', () => {
  it('shows 8 species per page by default', () => {
    expect(FLOWER_LIST_PAGE_SIZE).toBe(8);
  });

  it('does not offer "show more" for 8 items or fewer', async () => {
    build(8);
    await start();
    expect(shown()).toBe(8);
    expect(more().hidden).toBe(true);
    build(3);
    await start();
    expect(shown()).toBe(3);
    expect(more().hidden).toBe(true);
  });

  it('offers "show more" as soon as there are more than 8 items, and reveals the rest', async () => {
    build(9);
    await start();
    expect(shown()).toBe(8);
    expect(more().hidden).toBe(false);
    more().click();
    expect(shown()).toBe(9);
    expect(more().hidden).toBe(true);
  });

  it('pages in steps of 8', async () => {
    build(20);
    await start();
    expect(shown()).toBe(8);
    more().click();
    expect(shown()).toBe(16);
    expect(more().hidden).toBe(false);
    more().click();
    expect(shown()).toBe(20);
    expect(more().hidden).toBe(true);
  });

  it('still honours an explicit page size on the page', async () => {
    build(10, 'data-page-size="4"');
    await start();
    expect(shown()).toBe(4);
    expect(more().hidden).toBe(false);
  });
});
