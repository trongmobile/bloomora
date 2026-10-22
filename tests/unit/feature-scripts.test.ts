// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initCards } from '../../src/scripts/cards';
import { initEmbedCode } from '../../src/scripts/embed-code';
import { initPlanner } from '../../src/scripts/planner';
import { initQuiz } from '../../src/scripts/quiz';
import { getDict } from '../../src/i18n';
import { FLOWERS } from '../../src/data';
import { OCCASIONS } from '../../src/data/occasions';

const flush = () => new Promise((r) => setTimeout(r, 0));

beforeEach(() => {
  document.body.innerHTML = '';
  history.replaceState(null, '', '/');
});
afterEach(() => vi.restoreAllMocks());

describe('quiz script', () => {
  const radios = (name: string, values: string[]) => values.map((v) => `<label><input type="radio" name="${name}" value="${v}" />${v}</label>`).join('');
  const html = `<form data-quiz data-result-base="/vi/quiz/result/" data-count-label="Câu {n}/{total}">
    <fieldset data-quiz-step data-scored><legend tabindex="-1">Q1</legend>${radios('q1', ['seed', 'seedling'])}</fieldset>
    <fieldset data-quiz-step data-scored><legend tabindex="-1">Q2</legend>${radios('q2', ['seed', 'wilting'])}</fieldset>
    <fieldset data-quiz-step data-scored><legend tabindex="-1">Q3</legend>${radios('q3', ['seed', 'germination'])}</fieldset>
    <fieldset data-quiz-step data-flower><legend tabindex="-1">Pick</legend>${radios('flower', ['rose', 'lotus'])}</fieldset>
    <div data-quiz-nav hidden>
      <progress data-quiz-progress max="4" value="1"></progress><p data-quiz-count></p>
      <button type="button" data-quiz-back hidden>Back</button>
      <button type="submit" data-quiz-next data-label-next="Next" data-label-done="Done" disabled>Next</button>
    </div></form>`;
  const steps = () => [...document.querySelectorAll<HTMLElement>('[data-quiz-step]')];
  const visible = () => steps().map((s) => !s.hidden);
  const pick = (name: string, value: string) => {
    const input = document.querySelector<HTMLInputElement>(`input[name="${name}"][value="${value}"]`)!;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const next = () => document.querySelector<HTMLButtonElement>('[data-quiz-next]')!;
  const submit = () => document.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

  it('shows one question at a time and only lets you go on after choosing', () => {
    document.body.innerHTML = html;
    initQuiz(document, { navigate: vi.fn() });
    expect(visible()).toEqual([true, false, false, false]);
    expect(document.querySelector<HTMLElement>('[data-quiz-nav]')!.hidden).toBe(false);
    expect(document.querySelector('[data-quiz-count]')!.textContent).toBe('Câu 1/4');
    expect(next().disabled).toBe(true);
    expect(document.querySelector<HTMLElement>('[data-quiz-back]')!.hidden).toBe(true);

    submit(); // nothing chosen: stays
    expect(visible()).toEqual([true, false, false, false]);

    pick('q1', 'seed');
    expect(next().disabled).toBe(false);
    submit();
    expect(visible()).toEqual([false, true, false, false]);
    expect(document.querySelector('[data-quiz-count]')!.textContent).toBe('Câu 2/4');
    expect(document.querySelector<HTMLProgressElement>('[data-quiz-progress]')!.value).toBe(2);
    expect(next().disabled).toBe(true); // the new question has no answer yet
    expect(document.activeElement?.tagName).toBe('LEGEND');
  });

  it('goes back and keeps the answer, and relabels the last button', () => {
    document.body.innerHTML = html;
    initQuiz(document, { navigate: vi.fn() });
    pick('q1', 'seedling');
    submit();
    document.querySelector<HTMLButtonElement>('[data-quiz-back]')!.click();
    expect(visible()).toEqual([true, false, false, false]);
    expect(document.querySelector<HTMLInputElement>('input[name="q1"][value="seedling"]')!.checked).toBe(true);
    expect(next().disabled).toBe(false);
    pick('q1', 'seedling');
    submit();
    pick('q2', 'wilting');
    submit();
    pick('q3', 'seed');
    submit();
    expect(next().textContent).toBe('Done');
  });

  it('scores the answers and opens the matching result with the chosen flower', () => {
    document.body.innerHTML = html;
    const navigate = vi.fn();
    initQuiz(document, { navigate });
    pick('q1', 'seed');
    submit();
    pick('q2', 'seed');
    submit();
    pick('q3', 'germination');
    submit();
    submit(); // flower not chosen yet: no navigation
    expect(navigate).not.toHaveBeenCalled();
    pick('flower', 'lotus');
    submit();
    expect(navigate).toHaveBeenCalledWith('/vi/quiz/result/seed/?f=lotus');
  });

  it('does nothing on a page without the quiz', () => {
    document.body.innerHTML = '<p>hi</p>';
    expect(() => initQuiz(document, { navigate: vi.fn() })).not.toThrow();
  });
});

describe('planner script', () => {
  const dict = getDict('vi');
  const config = {
    lang: 'vi',
    defaultFlower: 'sunflower',
    url: 'https://flowers.example.com/vi/planner/',
    labels: dict.planner,
    levels: dict.taxonomy.confidence,
    flowers: FLOWERS.map((f) => ({ id: f.id, name: f.text.vi.name, href: `/vi/flowers/${f.slugs.vi}/`, days: f.daysToBloom, confidence: f.confidence, startNote: f.text.vi.startNote })),
    occasions: OCCASIONS.map((o) => ({ id: o.id, name: o.name.vi, fixed: o.fixed, dates: o.dates })),
  };
  const setup = (query = '') => {
    history.replaceState(null, '', `/vi/planner/${query}`);
    document.body.innerHTML = `<div data-planner data-config='${JSON.stringify(config).replace(/'/g, '&#39;')}'>
      <form>
        <select data-planner-flower>${FLOWERS.map((f) => `<option value="${f.id}">${f.text.vi.name}</option>`).join('')}</select>
        <input type="date" data-planner-start />
        <select data-planner-goal><option value="none">none</option>${OCCASIONS.map((o) => `<option value="${o.id}">${o.name.vi}</option>`).join('')}<option value="custom">custom</option></select>
        <div data-planner-custom hidden><input type="date" data-planner-goal-date /></div>
      </form>
      <div data-planner-result></div>
      <div data-share data-url="" data-title="" data-text=""></div>
    </div>
    <table data-planner-table><thead><tr><th>f</th><th>b</th><th data-planner-fit-col hidden>fit</th></tr></thead><tbody>
      ${FLOWERS.map((f) => `<tr data-flower-id="${f.id}"><th>${f.text.vi.name}</th><td data-bloom></td><td data-fit hidden></td></tr>`).join('')}
    </tbody></table>`;
    initPlanner(document, { today: () => '2026-10-22' });
  };
  const result = () => document.querySelector('[data-planner-result]')!.textContent ?? '';
  const change = (selector: string, value: string) => {
    const el = document.querySelector<HTMLInputElement | HTMLSelectElement>(selector)!;
    el.value = value;
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };

  it('shows the bloom window from today for the default flower', () => {
    setup();
    expect(document.querySelector<HTMLInputElement>('[data-planner-start]')!.value).toBe('2026-10-22');
    expect(result()).toContain('Kết quả cho Hoa hướng dương');
    expect(result()).toContain('11/12/2026 – 9/2/2027'); // sunflower 50–110 days
    expect(result()).not.toContain('Mốc:');
    expect(location.search).toBe(''); // defaults keep the URL clean
  });

  it('opens a shared link: flower, start date and goal come from the address', () => {
    setup('?f=marigold&s=2026-10-22&g=tet');
    expect(document.querySelector<HTMLSelectElement>('[data-planner-flower]')!.value).toBe('marigold');
    expect(result()).toContain('11/12/2026 – 30/1/2027');
    expect(result()).toContain('Mốc: Tết Nguyên Đán (6/2/2027)');
    expect(result()).toContain('Kịp: dự kiến nở trước mốc');
    expect(result()).toContain('29/10/2026'); // start by this date to be sure
    expect(document.querySelector<HTMLElement>('[data-planner-fit-col]')!.hidden).toBe(false);
    const row = (id: string) => document.querySelector<HTMLElement>(`[data-flower-id="${id}"]`)!;
    expect(row('marigold').querySelector('[data-fit]')!.textContent).toBe('Kịp: dự kiến nở trước mốc');
    expect(row('cherry-blossom').querySelector('[data-fit]')!.textContent).toBe('Khó kịp mốc này');
    expect(row('marigold').classList.contains('is-selected')).toBe(true);
  });

  it('recomputes when the visitor changes an input, and keeps the link and share box in step', () => {
    setup();
    change('[data-planner-flower]', 'rose');
    change('[data-planner-goal]', 'valentine');
    expect(result()).toContain('Kết quả cho Hoa hồng');
    expect(result()).toContain('Mốc: Valentine 14/2 (14/2/2027)');
    expect(result()).toContain('Khó kịp mốc này');
    expect(location.search).toBe('?f=rose&g=valentine');
    const share = document.querySelector<HTMLElement>('[data-share]')!;
    expect(share.dataset.url).toBe('https://flowers.example.com/vi/planner/?f=rose&g=valentine');
    expect(share.dataset.text).toContain('Hoa hồng');
    expect(share.dataset.text).toContain('ước tính');
  });

  it('supports a custom goal date and warns when the start is already too late', () => {
    setup('?f=marigold');
    change('[data-planner-goal]', 'custom');
    expect(document.querySelector<HTMLElement>('[data-planner-custom]')!.hidden).toBe(false);
    change('[data-planner-goal-date]', '2026-11-20');
    expect(result()).toContain('Khó kịp mốc này');
    expect(result()).toContain('đã qua so với ngày bạn chọn');
    expect(location.search).toContain('g=2026-11-20');
  });

  it('says so when the data has no date for an occasion that far ahead', () => {
    setup('?s=2031-01-01&g=tet');
    expect(result()).toContain('Chưa có ngày cho “Tết Nguyên Đán”');
    expect(document.querySelector<HTMLElement>('[data-planner-fit-col]')!.hidden).toBe(true);
  });

  it('shows the confidence of the numbers, flagging low confidence', () => {
    setup('?f=rose');
    expect(document.querySelector('.badge--warn')?.textContent).toContain('Thấp');
    setup('?f=marigold');
    expect(document.querySelector('.badge--warn')).toBeNull();
  });

  it('ignores a hand-edited address', () => {
    setup('?f=<script>&s=banana&g=whenever');
    expect(result()).toContain('Kết quả cho Hoa hướng dương');
    expect(document.querySelector<HTMLInputElement>('[data-planner-start]')!.value).toBe('2026-10-22');
  });
});

describe('cards script', () => {
  it('reveals the print button and toggles sorting-game mode', () => {
    document.body.innerHTML = '<button data-print hidden>Print</button><input type="checkbox" data-blind /><ol data-stage-cards></ol>';
    const print = vi.fn();
    window.print = print;
    initCards();
    const button = document.querySelector<HTMLButtonElement>('[data-print]')!;
    expect(button.hidden).toBe(false);
    button.click();
    expect(print).toHaveBeenCalledOnce();
    const blind = document.querySelector<HTMLInputElement>('[data-blind]')!;
    const list = document.querySelector('[data-stage-cards]')!;
    blind.checked = true;
    blind.dispatchEvent(new Event('change'));
    expect(list.classList.contains('is-blind')).toBe(true);
    blind.checked = false;
    blind.dispatchEvent(new Event('change'));
    expect(list.classList.contains('is-blind')).toBe(false);
  });
});

describe('embed code box', () => {
  const input = {
    embedUrl: 'https://flowers.example.com/vi/embed/hoa-sen/',
    flowerUrl: 'https://flowers.example.com/vi/flowers/hoa-sen/',
    title: 'Hoa sen',
    credit: 'Xem Hoa sen',
  };
  const html = `<details data-embed-code data-embed-input='${JSON.stringify(input)}' data-msg-copied="Copied" data-msg-failed="Failed">
    <select data-embed-theme><option value="auto">a</option><option value="light">l</option><option value="dark">d</option></select>
    <textarea data-embed-text></textarea><button data-embed-copy>Copy</button></details><div id="toast"></div>`;

  it('fills the snippet, follows the theme choice and copies it', async () => {
    document.body.innerHTML = html;
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
    initEmbedCode();
    const text = document.querySelector<HTMLTextAreaElement>('[data-embed-text]')!;
    expect(text.value).toContain('<iframe src="https://flowers.example.com/vi/embed/hoa-sen/"');
    expect(text.value).not.toContain('theme=');
    const select = document.querySelector<HTMLSelectElement>('[data-embed-theme]')!;
    select.value = 'dark';
    select.dispatchEvent(new Event('change'));
    expect(text.value).toContain('hoa-sen/?theme=dark"');
    document.querySelector<HTMLButtonElement>('[data-embed-copy]')!.click();
    await flush();
    expect(writeText).toHaveBeenCalledWith(text.value);
    expect(document.getElementById('toast')!.textContent).toBe('Copied');
  });
});
