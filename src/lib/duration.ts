import type { Lang } from '../data/types';

type Unit = 'day' | 'week' | 'month' | 'year';

const NAMES: Record<Lang, Record<Unit, [string, string]>> = {
  vi: { day: ['ngày', 'ngày'], week: ['tuần', 'tuần'], month: ['tháng', 'tháng'], year: ['năm', 'năm'] },
  en: { day: ['day', 'days'], week: ['week', 'weeks'], month: ['month', 'months'], year: ['year', 'years'] },
};

const DAYS_PER: Record<Unit, number> = { day: 1, week: 7, month: 30, year: 365 };

/** Picks the unit that reads best for the *upper* bound of a range. */
export function pickUnit(maxDays: number): Unit {
  if (maxDays < 14) return 'day';
  if (maxDays < 70) return 'week';
  if (maxDays < 730) return 'month';
  return 'year';
}

function unitName(lang: Lang, unit: Unit, n: number): string {
  const [one, many] = NAMES[lang][unit];
  return n === 1 ? one : many;
}

/**
 * Formats an estimated range of days as a short human string,
 * e.g. [50, 110] -> "2–4 tháng" / "2–4 months". The caller adds "~" or "khoảng" if wanted.
 */
export function formatDayRange(range: readonly [number, number], lang: Lang): string {
  const [minDays, maxDays] = range;
  const unit = pickUnit(maxDays);
  const per = DAYS_PER[unit];
  const lo = Math.max(1, Math.round(minDays / per));
  const hi = Math.max(1, Math.round(maxDays / per));
  if (lo >= hi) return `${hi} ${unitName(lang, unit, hi)}`;
  return `${lo}–${hi} ${unitName(lang, unit, hi)}`;
}

/** Same as formatDayRange but for a single point (used for elapsed-time midpoints). */
export function formatDays(days: number, lang: Lang): string {
  return formatDayRange([days, days], lang);
}

/** Formats an interpolated elapsed range, collapsing to "0" at the very start. */
export function formatElapsed(minDays: number, maxDays: number, lang: Lang): string {
  if (maxDays < 0.5) return lang === 'vi' ? '0 ngày' : '0 days';
  return formatDayRange([minDays, maxDays], lang);
}
