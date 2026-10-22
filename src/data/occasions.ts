/**
 * Dates people plan flowers for. Tết follows the lunar calendar, so its Gregorian dates are
 * listed, not computed. Each was checked against published calendars (Tết 2027 is Saturday
 * 6 Feb 2027, 2028 is Wednesday 26 Jan, 2029 is Tuesday 13 Feb). Years not listed are simply
 * unavailable: the planner then asks for a custom date. Do not extend the list from memory or
 * from Intl's "chinese" calendar, which is a day off for some years.
 */
import type { Lang } from './types';

export type OccasionId = 'tet' | 'valentine' | 'womens-day' | 'vn-womens-day' | 'teachers-day';

export interface Occasion {
  id: OccasionId;
  name: Record<Lang, string>;
  /** Same day every year. */
  fixed?: { month: number; day: number };
  /** Explicit dates (ISO), ascending. */
  dates?: readonly string[];
}

export const TET_DATES = ['2027-02-06', '2028-01-26', '2029-02-13'] as const;

export const OCCASIONS: readonly Occasion[] = [
  { id: 'tet', name: { vi: 'Tết Nguyên Đán', en: 'Lunar New Year (Tết)' }, dates: TET_DATES },
  { id: 'valentine', name: { vi: 'Valentine 14/2', en: 'Valentine’s Day (14 Feb)' }, fixed: { month: 2, day: 14 } },
  { id: 'womens-day', name: { vi: 'Quốc tế Phụ nữ 8/3', en: 'International Women’s Day (8 Mar)' }, fixed: { month: 3, day: 8 } },
  { id: 'vn-womens-day', name: { vi: 'Phụ nữ Việt Nam 20/10', en: 'Vietnamese Women’s Day (20 Oct)' }, fixed: { month: 10, day: 20 } },
  { id: 'teachers-day', name: { vi: 'Nhà giáo Việt Nam 20/11', en: 'Vietnamese Teachers’ Day (20 Nov)' }, fixed: { month: 11, day: 20 } },
];
