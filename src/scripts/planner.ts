import type { Lang } from '../data/types';
import { fmt } from '../i18n';
import {
  addDays,
  checkGoal,
  isIso,
  localIso,
  nextOccurrence,
  parsePlannerQuery,
  planBloom,
  serializePlannerQuery,
  type GoalFit,
  type Iso,
  type PlannerState,
} from '../lib/planner';
import { formatDayRange } from '../lib/duration';

interface FlowerEntry {
  id: string;
  name: string;
  href: string;
  days: [number, number];
  confidence: 'moderate' | 'low';
  startNote: string;
}
interface OccasionEntry {
  id: string;
  name: string;
  fixed?: { month: number; day: number };
  dates?: string[];
}
type Labels = Record<string, string>;
interface Config {
  lang: Lang;
  defaultFlower: string;
  url: string;
  labels: Labels;
  levels: Record<string, string>;
  flowers: FlowerEntry[];
  occasions: OccasionEntry[];
}

function h<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

export interface PlannerDeps {
  /** Today's date; injectable so tests do not depend on the clock. */
  today: () => Iso;
}

/** The interactive calculator: reads inputs, shows the bloom window and, with a goal, whether it is in time. */
export function initPlanner(root: ParentNode = document, deps: PlannerDeps = { today: () => localIso() }): void {
  const box = root.querySelector<HTMLElement>('[data-planner]');
  if (!box?.dataset.config) return;
  const cfg = JSON.parse(box.dataset.config) as Config;
  const L = cfg.labels;
  const flowerSel = box.querySelector<HTMLSelectElement>('[data-planner-flower]');
  const startIn = box.querySelector<HTMLInputElement>('[data-planner-start]');
  const goalSel = box.querySelector<HTMLSelectElement>('[data-planner-goal]');
  const customWrap = box.querySelector<HTMLElement>('[data-planner-custom]');
  const goalDateIn = box.querySelector<HTMLInputElement>('[data-planner-goal-date]');
  const out = box.querySelector<HTMLElement>('[data-planner-result]');
  const share = box.querySelector<HTMLElement>('[data-share]');
  const table = root.querySelector<HTMLElement>('[data-planner-table]');
  if (!flowerSel || !startIn || !goalSel || !customWrap || !goalDateIn || !out) return;

  const today = deps.today();
  const dateFmt = new Intl.DateTimeFormat(cfg.lang, { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const show = (iso: Iso): string => dateFmt.format(new Date(`${iso}T12:00:00Z`));
  const range = (a: Iso, b: Iso): string => fmt(L.dateRange!, { from: show(a), to: show(b) });
  const flowerIds = cfg.flowers.map((f) => f.id);
  const occasionIds = cfg.occasions.map((o) => o.id);

  const state: PlannerState = parsePlannerQuery(location.search, { flowers: flowerIds, occasions: occasionIds, today, defaultFlower: cfg.defaultFlower });

  const writeControls = (): void => {
    flowerSel.value = state.flower;
    startIn.value = state.start;
    const custom = isIso(state.goal);
    goalSel.value = custom ? 'custom' : state.goal;
    customWrap.hidden = !custom;
    if (custom) goalDateIn.value = state.goal;
  };

  /** The goal as a date, plus a display name; undefined when "no goal" or the data has no such date yet. */
  const resolveGoal = (): { date: Iso; name: string } | 'missing' | undefined => {
    if (state.goal === 'none') return undefined;
    if (isIso(state.goal)) return { date: state.goal, name: show(state.goal) };
    const occasion = cfg.occasions.find((o) => o.id === state.goal);
    if (!occasion) return undefined;
    const date = nextOccurrence(occasion, state.start);
    return date ? { date, name: occasion.name } : 'missing';
  };

  const fitLabel = (fit: GoalFit): string => (fit === 'ready' ? L.fitReady! : fit === 'maybe' ? L.fitMaybe! : L.fitLate!);

  const render = (): void => {
    const flower = cfg.flowers.find((f) => f.id === state.flower) ?? cfg.flowers[0]!;
    const plan = planBloom({ daysToBloom: flower.days }, state.start);
    const goal = resolveGoal();

    out.replaceChildren();
    const panel = h('div', 'planner__panel glass panel');
    panel.dataset.tier = 'elevated';
    panel.append(h('h2', 't-heading', fmt(L.resultTitle!, { name: flower.name })));
    const window = h('p', 'planner__window');
    window.append(h('span', 'muted', `${L.bloomWindow}`), document.createElement('br'), h('strong', 'planner__dates', range(plan.earliest, plan.latest)));
    panel.append(window);
    panel.append(h('p', 'muted', `${fmt(L.fromStart!, { range: formatDayRange(flower.days, cfg.lang) })} ${flower.startNote}`));
    const conf = h('span', `badge${flower.confidence === 'low' ? ' badge--warn' : ''}`, fmt(L.confidence!, { level: cfg.levels[flower.confidence] ?? flower.confidence }));
    panel.append(conf);

    if (goal === 'missing') {
      const occ = cfg.occasions.find((o) => o.id === state.goal);
      panel.append(h('p', 'planner__goal', fmt(L.goalMissing!, { name: occ?.name ?? '' })));
    } else if (goal) {
      const res = checkGoal({ daysToBloom: flower.days }, state.start, goal.date);
      const line = h('div', 'planner__goal');
      line.append(h('p', 'muted', fmt(L.goalLine!, { name: goal.name, date: show(goal.date) })));
      line.append(h('p', `planner__fit planner__fit--${res.fit}`, fitLabel(res.fit)));
      if (res.fit === 'ready') line.append(h('p', undefined, fmt(L.readyMargin!, { n: res.margin })));
      if (res.fit === 'late') line.append(h('p', undefined, fmt(L.lateMargin!, { n: res.margin })));
      line.append(
        h(
          'p',
          undefined,
          state.start > res.startLast
            ? fmt(L.startPast!, { last: show(res.startLast) })
            : fmt(L.startAdvice!, { safe: show(res.startSafe), last: show(res.startLast) }),
        ),
      );
      line.append(h('p', 'muted t-small', L.bloomLasts));
      panel.append(line);
    }
    panel.append(h('p', 'muted t-small', L.estimateNote));
    out.append(panel);

    // The table: every species from this start date, and against the goal when there is one.
    if (table) {
      const fitCol = table.querySelector<HTMLElement>('[data-planner-fit-col]');
      const showFit = !!goal && goal !== 'missing';
      if (fitCol) fitCol.hidden = !showFit;
      table.querySelectorAll<HTMLElement>('tbody tr').forEach((row) => {
        const f = cfg.flowers.find((x) => x.id === row.dataset.flowerId);
        if (!f) return;
        const p = planBloom({ daysToBloom: f.days }, state.start);
        const bloom = row.querySelector<HTMLElement>('[data-bloom]');
        if (bloom) bloom.textContent = range(p.earliest, p.latest);
        const fit = row.querySelector<HTMLElement>('[data-fit]');
        if (fit) {
          fit.hidden = !showFit;
          fit.textContent = showFit ? fitLabel(checkGoal({ daysToBloom: f.days }, state.start, (goal as { date: Iso }).date).fit) : L.noGoal!;
        }
        row.classList.toggle('is-selected', f.id === state.flower);
      });
    }

    // Keep the address and the share box in step, so a copied link reopens exactly this result.
    const query = serializePlannerQuery(state, { flower: cfg.defaultFlower, today });
    try {
      history.replaceState(null, '', `${location.pathname}${query}${location.hash}`);
    } catch {
      /* some embedded contexts forbid it; the page still works */
    }
    if (share) {
      share.dataset.url = `${cfg.url}${query}`;
      share.dataset.text = fmt(L.shareText!, { name: flower.name, start: show(state.start), from: show(plan.earliest), to: show(plan.latest) });
      share.dataset.title = fmt(L.resultTitle!, { name: flower.name });
    }
  };

  const read = (): void => {
    state.flower = flowerIds.includes(flowerSel.value) ? flowerSel.value : cfg.defaultFlower;
    state.start = isIso(startIn.value) ? startIn.value : today;
    if (goalSel.value === 'custom') {
      state.goal = isIso(goalDateIn.value) ? goalDateIn.value : addDays(state.start, 90);
      goalDateIn.value = state.goal;
    } else {
      state.goal = goalSel.value;
    }
    customWrap.hidden = goalSel.value !== 'custom';
    render();
  };

  box.addEventListener('input', read);
  box.addEventListener('change', read);
  box.querySelector('form')?.addEventListener('submit', (e) => e.preventDefault());
  writeControls();
  render();
  box.dataset.plannerReady = 'true';
}
