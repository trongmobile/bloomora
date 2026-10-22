import { describe, expect, it } from 'vitest';
import { FLOWERS } from '../../src/data';
import { STAGE_IDS } from '../../src/data/types';
import { EMBED_HEIGHT, embedSnippet, embedSrc } from '../../src/lib/embed';
import { MOMENT_LOCAL, hasStage, momentBioState, momentProgress, momentSvg } from '../../src/lib/moment';
import { routes } from '../../src/lib/routes';
import { parseStageParam, stageDeepLink } from '../../src/lib/stage-link';
import { bioStateAt, bioStateForStage } from '../../src/lib/timelapse/keyframes';
import { buildTimeline } from '../../src/lib/timelapse/timeline';

const lotus = FLOWERS.find((f) => f.id === 'lotus')!;

describe('moments', () => {
  it('shows a stage at a fixed point inside it, on the species own timeline', () => {
    const tl = buildTimeline(lotus.stages);
    const p = momentProgress(lotus, 'bud-development')!;
    const seg = tl.segments.find((s) => s.id === 'bud-development')!;
    expect(p).toBeGreaterThan(seg.start);
    expect(p).toBeLessThan(seg.end);
    expect((p - seg.start) / (seg.end - seg.start)).toBeCloseTo(MOMENT_LOCAL, 6);
    expect(momentBioState(lotus, 'bud-development')).toEqual(bioStateAt(tl, p));
  });

  it('shows the same picture whether it comes from the timeline or from the species-independent state', () => {
    // Every species currently has all nine stages, so both routes must agree (the quiz relies on this).
    for (const f of FLOWERS) {
      for (const stage of STAGE_IDS) {
        const a = momentBioState(f, stage);
        const b = bioStateForStage(stage, MOMENT_LOCAL);
        for (const key of Object.keys(b) as (keyof typeof b)[]) expect(a[key], `${f.id}/${stage}/${key}`).toBeCloseTo(b[key], 9);
      }
    }
  });

  it('falls back to the generic stage state for a species that skips a stage', () => {
    const noSeed = { ...lotus, stages: lotus.stages.filter((s) => s.id !== 'seed') };
    expect(hasStage(noSeed, 'seed')).toBe(false);
    expect(momentProgress(noSeed, 'seed')).toBeUndefined();
    expect(momentBioState(noSeed, 'seed')).toEqual(bioStateForStage('seed', MOMENT_LOCAL));
  });

  it('renders a self-contained SVG per stage, different for each stage', () => {
    const svgs = STAGE_IDS.map((s) => momentSvg(lotus, s, 'm'));
    for (const svg of svgs) {
      expect(svg.startsWith('<svg')).toBe(true);
      expect(svg).toContain('aria-hidden="true"');
    }
    expect(new Set(svgs).size).toBe(STAGE_IDS.length);
  });

  it('builds clean routes for every kind of page', () => {
    expect(routes.moment('vi', 'hoa-sen', 'blooming')).toBe('/vi/flowers/hoa-sen/moment/blooming/');
    expect(routes.momentBase('en', 'lotus')).toBe('/en/flowers/lotus/moment/');
    expect(routes.artMoment('lotus', 'seed')).toBe('/art/moments/lotus/seed.svg');
    expect(routes.ogMoment('vi', 'cherry-blossom', 'full-bloom')).toBe('/og/moments/vi/cherry-blossom-full-bloom.png');
    expect(routes.ogQuiz('en', 'wilting')).toBe('/og/quiz/en/wilting.png');
    expect(routes.quizResult('vi', 'seed')).toBe('/vi/quiz/result/seed/');
    expect(routes.embed('vi', 'hoa-sen')).toBe('/vi/embed/hoa-sen/');
    expect(routes.cards('en', 'lotus')).toBe('/en/classroom/cards/lotus/');
  });
});

describe('stage deep links', () => {
  it('accepts only known stages', () => {
    expect(parseStageParam('?stage=full-bloom')).toBe('full-bloom');
    expect(parseStageParam('?x=1&stage=seed')).toBe('seed');
    expect(parseStageParam('?stage=nope')).toBeUndefined();
    expect(parseStageParam('?stage=')).toBeUndefined();
    expect(parseStageParam('')).toBeUndefined();
  });

  it('refuses a stage the species does not have', () => {
    expect(parseStageParam('?stage=seed', ['germination', 'seedling'])).toBeUndefined();
    expect(parseStageParam('?stage=seedling', ['germination', 'seedling'])).toBe('seedling');
  });

  it('builds a link that lands on the player', () => {
    expect(stageDeepLink('https://x.test/vi/flowers/hoa-sen/', 'blooming')).toBe('https://x.test/vi/flowers/hoa-sen/?stage=blooming#timelapse');
  });
});

describe('embed snippet', () => {
  const input = {
    embedUrl: 'https://x.test/vi/embed/hoa-sen/',
    flowerUrl: 'https://x.test/vi/flowers/hoa-sen/',
    title: 'Hoa "sen": time-lapse <b>',
    credit: 'Xem Hoa sen & Bloomora',
  };

  it('produces an iframe with an accessible title, fullscreen and a visible credit link', () => {
    const html = embedSnippet(input);
    expect(html).toContain('<iframe src="https://x.test/vi/embed/hoa-sen/"');
    expect(html).toContain(`height="${EMBED_HEIGHT}"`);
    expect(html).toContain('allowfullscreen');
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('<a href="https://x.test/vi/flowers/hoa-sen/">Xem Hoa sen &amp; Bloomora</a>');
  });

  it('escapes anything that could break out of an attribute or inject markup', () => {
    const html = embedSnippet(input);
    expect(html).toContain('title="Hoa &quot;sen&quot;: time-lapse &lt;b&gt;"');
    expect(html).not.toContain('<b>');
  });

  it('adds the theme only when it is not automatic', () => {
    expect(embedSrc(input.embedUrl)).toBe(input.embedUrl);
    expect(embedSrc(input.embedUrl, 'auto')).toBe(input.embedUrl);
    expect(embedSrc(input.embedUrl, 'dark')).toBe(`${input.embedUrl}?theme=dark`);
    expect(embedSnippet({ ...input, theme: 'light' })).toContain('src="https://x.test/vi/embed/hoa-sen/?theme=light"');
  });
});
