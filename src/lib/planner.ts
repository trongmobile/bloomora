/**
 * Bloom planner maths. Pure date arithmetic on ISO calendar dates ("2026-10-22"), done at noon
 * UTC so daylight-saving never shifts a day. All timing comes from `daysToBloom`, which is an
 * estimated [min, max] range, so every answer is a window, never a single promised date.
 */
import type { Occasion } from '../data/occasions';

export type Iso = string;

const DAY_MS = 86_400_000;
const toDate = (iso: Iso): Date => new Date(`${iso}T12:00:00Z`);
const fromDate = (d: Date): Iso => d.toISOString().slice(0, 10);

export function isIso(value: string | null | undefined): value is Iso {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = toDate(value);
  return !Number.isNaN(d.getTime()) && fromDate(d) === value;
}

export function addDays(iso: Iso, days: number): Iso {
  return fromDate(new Date(toDate(iso).getTime() + Math.round(days) * DAY_MS));
}

/** Whole days from `a` to `b` (negative when `b` is earlier). */
export function daysBetween(a: Iso, b: Iso): number {
  return Math.round((toDate(b).getTime() - toDate(a).getTime()) / DAY_MS);
}

/** Today's calendar date in the visitor's own time zone. */
export function localIso(now: Date = new Date()): Iso {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

/** The first date of an occasion on or after `from`, or undefined when the data does not reach that far. */
export function nextOccurrence(occasion: Pick<Occasion, 'fixed' | 'dates'>, from: Iso): Iso | undefined {
  if (occasion.dates) return occasion.dates.find((d) => d >= from);
  if (!occasion.fixed) return undefined;
  const p = (n: number) => String(n).padStart(2, '0');
  const year = Number(from.slice(0, 4));
  const thisYear = `${year}-${p(occasion.fixed.month)}-${p(occasion.fixed.day)}`;
  return thisYear >= from ? thisYear : `${year + 1}-${p(occasion.fixed.month)}-${p(occasion.fixed.day)}`;
}

export interface BloomPlan {
  start: Iso;
  daysMin: number;
  daysMax: number;
  /** Earliest and latest estimated date of the first bloom. */
  earliest: Iso;
  latest: Iso;
}

export function planBloom(flower: { daysToBloom: readonly [number, number] }, start: Iso): BloomPlan {
  const [daysMin, daysMax] = flower.daysToBloom;
  return { start, daysMin, daysMax, earliest: addDays(start, daysMin), latest: addDays(start, daysMax) };
}

/**
 * ready: even the slow end of the range blooms before the goal.
 * maybe: the goal falls inside the window.
 * late:  even the fast end blooms after the goal.
 */
export type GoalFit = 'ready' | 'maybe' | 'late';

export interface GoalResult {
  goal: Iso;
  fit: GoalFit;
  /** ready: days of spare time at the slow end; late: days of delay at the fast end; maybe: 0. */
  margin: number;
  /** Start by this date to be sure (slow end) / to have any chance (fast end). */
  startSafe: Iso;
  startLast: Iso;
}

export function checkGoal(flower: { daysToBloom: readonly [number, number] }, start: Iso, goal: Iso): GoalResult {
  const plan = planBloom(flower, start);
  const fit: GoalFit = plan.latest <= goal ? 'ready' : plan.earliest > goal ? 'late' : 'maybe';
  return {
    goal,
    fit,
    margin: fit === 'ready' ? daysBetween(plan.latest, goal) : fit === 'late' ? daysBetween(goal, plan.earliest) : 0,
    startSafe: addDays(goal, -plan.daysMax),
    startLast: addDays(goal, -plan.daysMin),
  };
}

/** What the visitor chose: a species, a start date and a goal ("none", an occasion id or an ISO date). */
export interface PlannerState {
  flower: string;
  start: Iso;
  goal: string;
}

export function parsePlannerQuery(
  search: string,
  opts: { flowers: readonly string[]; occasions: readonly string[]; today: Iso; defaultFlower: string },
): PlannerState {
  const q = new URLSearchParams(search);
  const flower = q.get('f');
  const start = q.get('s');
  const goal = q.get('g');
  return {
    flower: flower && opts.flowers.includes(flower) ? flower : opts.defaultFlower,
    start: isIso(start) ? start : opts.today,
    goal: goal && (opts.occasions.includes(goal) || isIso(goal)) ? goal : 'none',
  };
}

/** Query string for a state; empty when everything is the default, so plain visits keep a clean URL. */
export function serializePlannerQuery(state: PlannerState, defaults: { flower: string; today: Iso }): string {
  const q = new URLSearchParams();
  if (state.flower !== defaults.flower) q.set('f', state.flower);
  if (state.start !== defaults.today) q.set('s', state.start);
  if (state.goal !== 'none') q.set('g', state.goal);
  const s = q.toString();
  return s ? `?${s}` : '';
}
