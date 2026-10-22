import { describe, expect, it } from 'vitest';
import { FLOWERS, getFlower } from '../../src/data';
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '../../src/data/quiz';
import { LANGS, STAGE_IDS, type StageId } from '../../src/data/types';
import { getDict } from '../../src/i18n';
import { isStageId, pickFlowerId, resultQuery, scoreQuiz, shuffleStable, tally } from '../../src/lib/quiz';

describe('quiz data', () => {
  it('has seven questions with four options each, voting for four different stages', () => {
    expect(QUIZ_QUESTIONS).toHaveLength(7);
    expect(new Set(QUIZ_QUESTIONS.map((q) => q.id)).size).toBe(QUIZ_QUESTIONS.length);
    for (const q of QUIZ_QUESTIONS) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options.map((o) => o.stage)).size, q.id).toBe(4);
      for (const o of q.options) expect(STAGE_IDS).toContain(o.stage);
    }
  });

  it('is written in both languages, separately', () => {
    for (const q of QUIZ_QUESTIONS) {
      expect(q.prompt.vi).not.toBe(q.prompt.en);
      for (const o of q.options) {
        for (const lang of LANGS) expect(o.text[lang].length, `${q.id}/${o.stage}/${lang}`).toBeGreaterThan(8);
        expect(o.text.vi).not.toBe(o.text.en);
      }
    }
    for (const stage of STAGE_IDS) {
      const r = QUIZ_RESULTS[stage];
      for (const lang of LANGS) {
        expect(r.text[lang].title.length, `${stage}/${lang} title`).toBeGreaterThan(3);
        expect(r.text[lang].body.length, `${stage}/${lang} body`).toBeGreaterThan(60);
        expect(r.text[lang].tip.length, `${stage}/${lang} tip`).toBeGreaterThan(20);
        expect(JSON.stringify(r.text[lang])).not.toMatch(/lorem|TODO|TBD/i);
      }
      expect(r.text.vi.title).not.toBe(r.text.en.title);
    }
    expect(new Set(STAGE_IDS.map((s) => QUIZ_RESULTS[s].text.vi.title)).size).toBe(STAGE_IDS.length);
  });

  it('uses a real flower that has the stage for each result, and keeps the body OG-friendly', () => {
    for (const stage of STAGE_IDS) {
      const flower = getFlower(QUIZ_RESULTS[stage].showcase);
      expect(flower, stage).toBeTruthy();
      expect(flower!.stages.map((s) => s.id)).toContain(stage);
      for (const lang of LANGS) {
        // The result page uses the body as its meta description.
        const body = QUIZ_RESULTS[stage].text[lang].body;
        expect(body.length, `${stage}/${lang}`).toBeGreaterThanOrEqual(50);
        expect(body.length, `${stage}/${lang}`).toBeLessThanOrEqual(200);
      }
    }
  });

  it('never claims to be science: the quiz says it is for fun in both languages', () => {
    for (const lang of LANGS) {
      const d = getDict(lang).quiz;
      expect(d.disclaimer.length).toBeGreaterThan(20);
      expect(d.metaDescription.length).toBeGreaterThanOrEqual(50);
      expect(d.metaDescription.length).toBeLessThanOrEqual(200);
    }
  });

  it('lets every stage be the result of some set of answers', () => {
    const reachable = new Set<StageId>();
    const walk = (i: number, picked: StageId[]) => {
      if (i === QUIZ_QUESTIONS.length) {
        reachable.add(scoreQuiz(picked));
        return;
      }
      for (const o of QUIZ_QUESTIONS[i]!.options) walk(i + 1, [...picked, o.stage]);
    };
    walk(0, []);
    expect([...reachable].sort()).toEqual([...STAGE_IDS].sort());
  });
});

describe('scoring', () => {
  it('counts votes and returns the most voted stage', () => {
    expect(tally(['seed', 'seed', 'wilting']).seed).toBe(2);
    expect(scoreQuiz(['seed', 'wilting', 'seed'])).toBe('seed');
    expect(scoreQuiz(['full-bloom', 'full-bloom', 'full-bloom'])).toBe('full-bloom');
  });

  it('breaks a tie towards the middle of the answers, then the earlier stage', () => {
    // seed(0) and wilting(8) tie; the average is the middle, equidistant, so the earlier stage wins.
    expect(scoreQuiz(['seed', 'wilting'])).toBe('seed');
    // germination(1) and full-bloom(7) tie, but the third vote pulls the mean towards full-bloom.
    expect(scoreQuiz(['germination', 'full-bloom', 'full-bloom', 'germination', 'wilting'])).toBe('full-bloom');
  });

  it('is deterministic and rejects an empty quiz', () => {
    const a: StageId[] = ['seedling', 'blooming', 'seedling', 'blooming'];
    expect(scoreQuiz(a)).toBe(scoreQuiz([...a]));
    expect(() => scoreQuiz([])).toThrow();
  });
});

describe('helpers', () => {
  it('validates stage ids and the picked flower', () => {
    expect(isStageId('blooming')).toBe(true);
    expect(isStageId('nope')).toBe(false);
    expect(isStageId(undefined)).toBe(false);
    const ids = FLOWERS.map((f) => f.id);
    expect(pickFlowerId('?f=lotus', ids, 'rose')).toBe('lotus');
    expect(pickFlowerId('?f=evil<script>', ids, 'rose')).toBe('rose');
    expect(pickFlowerId('', ids, 'rose')).toBe('rose');
    expect(resultQuery('cherry-blossom')).toBe('?f=cherry-blossom');
  });

  it('shuffles options the same way every time, without losing or duplicating any', () => {
    const q = QUIZ_QUESTIONS[0]!;
    const a = shuffleStable(q.options, 101);
    expect(shuffleStable(q.options, 101)).toEqual(a);
    expect(a.map((o) => o.stage).sort()).toEqual(q.options.map((o) => o.stage).sort());
    expect(q.options.map((o) => o.stage)).not.toEqual(STAGE_IDS.filter((s) => q.options.some((o) => o.stage === s)).reverse());
    // Not left in life-cycle order for at least some of the questions.
    const inOrder = (xs: readonly { stage: StageId }[]) => xs.every((o, i) => i === 0 || STAGE_IDS.indexOf(xs[i - 1]!.stage) < STAGE_IDS.indexOf(o.stage));
    const shuffled = QUIZ_QUESTIONS.map((qq, i) => shuffleStable(qq.options, 101 + i * 17));
    expect(shuffled.filter(inOrder).length).toBeLessThan(QUIZ_QUESTIONS.length);
  });
});
