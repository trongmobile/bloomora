import { describe, expect, it } from 'vitest';
import { OCCASIONS, TET_DATES } from '../../src/data/occasions';
import { FLOWERS, getFlower } from '../../src/data';
import {
  addDays,
  checkGoal,
  daysBetween,
  isIso,
  localIso,
  nextOccurrence,
  parsePlannerQuery,
  planBloom,
  serializePlannerQuery,
} from '../../src/lib/planner';

const marigold = getFlower('marigold')!; // 50–100 days
const opts = { flowers: FLOWERS.map((f) => f.id), occasions: OCCASIONS.map((o) => o.id), today: '2026-10-22', defaultFlower: 'sunflower' };

describe('date arithmetic', () => {
  it('adds days across months, years and leap days', () => {
    expect(addDays('2026-10-22', 50)).toBe('2026-12-11');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2028-02-28', 1)).toBe('2028-02-29');
    expect(addDays('2027-02-06', -100)).toBe('2026-10-29');
  });

  it('is not thrown off by daylight-saving changes', () => {
    // 2026-03-29 is when Europe springs forward, 2026-11-01 is when the US falls back.
    expect(addDays('2026-03-28', 2)).toBe('2026-03-30');
    expect(addDays('2026-10-31', 2)).toBe('2026-11-02');
    expect(daysBetween('2026-03-01', '2026-04-01')).toBe(31);
    expect(daysBetween('2026-11-01', '2026-10-30')).toBe(-2);
  });

  it('validates ISO dates strictly', () => {
    expect(isIso('2026-10-22')).toBe(true);
    expect(isIso('2026-02-30')).toBe(false);
    expect(isIso('2026-13-01')).toBe(false);
    expect(isIso('22/10/2026')).toBe(false);
    expect(isIso('')).toBe(false);
    expect(isIso(null)).toBe(false);
  });

  it('formats the visitor’s local date, not UTC', () => {
    expect(localIso(new Date(2026, 9, 22, 23, 59))).toBe('2026-10-22');
    expect(localIso(new Date(2026, 0, 5, 0, 1))).toBe('2026-01-05');
  });
});

describe('occasions', () => {
  it('lists only Tết dates inside the lunar new year window, in order', () => {
    expect([...TET_DATES]).toEqual([...TET_DATES].sort());
    for (const d of TET_DATES) {
      expect(isIso(d)).toBe(true);
      expect(d.slice(5) >= '01-21' && d.slice(5) <= '02-20', d).toBe(true);
    }
    expect(TET_DATES).toContain('2027-02-06');
  });

  it('finds the next occurrence on or after a date', () => {
    const tet = OCCASIONS.find((o) => o.id === 'tet')!;
    expect(nextOccurrence(tet, '2026-10-22')).toBe('2027-02-06');
    expect(nextOccurrence(tet, '2027-02-06')).toBe('2027-02-06');
    expect(nextOccurrence(tet, '2027-02-07')).toBe('2028-01-26');
    expect(nextOccurrence(tet, '2030-01-01')).toBeUndefined();
    const valentine = OCCASIONS.find((o) => o.id === 'valentine')!;
    expect(nextOccurrence(valentine, '2026-10-22')).toBe('2027-02-14');
    expect(nextOccurrence(valentine, '2027-02-14')).toBe('2027-02-14');
    expect(nextOccurrence(valentine, '2027-02-15')).toBe('2028-02-14');
    const women = OCCASIONS.find((o) => o.id === 'vn-womens-day')!;
    expect(nextOccurrence(women, '2026-10-22')).toBe('2027-10-20');
  });

  it('names every occasion in both languages', () => {
    for (const o of OCCASIONS) {
      expect(o.name.vi.length).toBeGreaterThan(3);
      expect(o.name.en.length).toBeGreaterThan(3);
      expect(o.fixed || o.dates, o.id).toBeTruthy();
    }
  });
});

describe('bloom plan', () => {
  it('adds the estimated range to the start date', () => {
    const plan = planBloom(marigold, '2026-10-22');
    expect([plan.daysMin, plan.daysMax]).toEqual([50, 100]);
    expect(plan.earliest).toBe('2026-12-11');
    expect(plan.latest).toBe('2027-01-30');
  });

  it('judges a goal against the whole window', () => {
    const start = '2026-10-22';
    expect(checkGoal(marigold, start, '2027-02-06')).toMatchObject({ fit: 'ready', margin: 7, startSafe: '2026-10-29', startLast: '2026-12-18' });
    expect(checkGoal(marigold, start, '2027-01-10')).toMatchObject({ fit: 'maybe', margin: 0 });
    expect(checkGoal(marigold, start, '2026-12-01')).toMatchObject({ fit: 'late', margin: 10 });
    // Boundaries: the slow end exactly on the goal still counts as in time; the fast end exactly on it is not "late".
    expect(checkGoal(marigold, start, '2027-01-30').fit).toBe('ready');
    expect(checkGoal(marigold, start, '2026-12-11').fit).toBe('maybe');
    expect(checkGoal(marigold, start, '2026-12-10').fit).toBe('late');
  });

  it('keeps a long-lived tree honest', () => {
    const cherry = getFlower('cherry-blossom')!;
    expect(checkGoal(cherry, '2026-10-22', '2027-02-06').fit).toBe('late');
    expect(planBloom(cherry, '2026-10-22').earliest.slice(0, 4)).toBe('2036');
  });

  it('works out the start dates for every species and any goal without nonsense', () => {
    for (const f of FLOWERS) {
      const r = checkGoal(f, '2026-10-22', '2027-02-06');
      expect(r.startSafe <= r.startLast, f.id).toBe(true);
      expect(['ready', 'maybe', 'late']).toContain(r.fit);
    }
  });
});

describe('planner query', () => {
  it('reads a shared link', () => {
    expect(parsePlannerQuery('?f=marigold&s=2026-11-01&g=tet', opts)).toEqual({ flower: 'marigold', start: '2026-11-01', goal: 'tet' });
    expect(parsePlannerQuery('?g=2027-03-08', opts).goal).toBe('2027-03-08');
  });

  it('falls back to safe defaults for anything invalid', () => {
    expect(parsePlannerQuery('', opts)).toEqual({ flower: 'sunflower', start: '2026-10-22', goal: 'none' });
    expect(parsePlannerQuery('?f=<script>&s=nope&g=whenever', opts)).toEqual({ flower: 'sunflower', start: '2026-10-22', goal: 'none' });
    expect(parsePlannerQuery('?s=2026-02-31', opts).start).toBe('2026-10-22');
  });

  it('writes only what differs from the defaults', () => {
    const d = { flower: 'sunflower', today: '2026-10-22' };
    expect(serializePlannerQuery({ flower: 'sunflower', start: '2026-10-22', goal: 'none' }, d)).toBe('');
    expect(serializePlannerQuery({ flower: 'rose', start: '2026-10-22', goal: 'tet' }, d)).toBe('?f=rose&g=tet');
    const state = { flower: 'lotus', start: '2026-12-01', goal: '2027-06-01' };
    expect(parsePlannerQuery(serializePlannerQuery(state, d), opts)).toEqual(state);
  });
});
