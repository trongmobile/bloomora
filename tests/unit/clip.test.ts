import { describe, expect, it } from 'vitest';
import { FLOWERS } from '../../src/data';
import { getDict } from '../../src/i18n';
import {
  ART_CROP,
  STORY_H,
  STORY_W,
  buildStoryFrame,
  clipProgress,
  fitLine,
  fitSize,
  wrapText,
  type Measure,
  type StoryInput,
} from '../../src/lib/clip/frame';
import { brandAddress, createMomentStory, quizStory } from '../../src/lib/clip/story';
import { storyToSvg } from '../../src/lib/clip/svg';

/** A fixed-width fake font: every character is 0.5 em wide, so layout is predictable. */
const measure: Measure = (text, _face, size) => text.length * size * 0.5;

const sunflower = FLOWERS.find((f) => f.id === 'sunflower')!;
const dict = getDict('vi');
const momentData = () => ({
  lang: 'vi' as const,
  flowerName: sunflower.text.vi.name,
  scientificName: sunflower.scientificName,
  visual: sunflower.visual,
  stages: sunflower.stages,
  stageTexts: sunflower.stages.map((s) => ({ id: s.id, name: sunflower.text.vi.stages[s.id]?.name ?? dict.stageNames[s.id] })),
  labels: dict.player,
  brandUrl: 'bloomora.example/vi/flowers/hoa-huong-duong',
});

describe('text fitting', () => {
  it('shrinks a title until it fits, never below the minimum', () => {
    expect(fitSize('abcdefghij', 'serif', 100, 20, 1000, measure)).toBe(100);
    expect(fitSize('abcdefghij', 'serif', 100, 20, 400, measure)).toBe(80);
    expect(fitSize('a'.repeat(200), 'serif', 100, 20, 400, measure)).toBe(20);
  });

  it('shortens a line with an ellipsis when even the smallest size is too wide', () => {
    const fitted = fitLine('a'.repeat(200), 'serif', 100, 20, 400, measure);
    expect(fitted.size).toBe(20);
    expect(fitted.text.endsWith('…')).toBe(true);
    expect(measure(fitted.text, 'serif', fitted.size)).toBeLessThanOrEqual(400);
    expect(fitLine('short', 'serif', 100, 20, 1000, measure)).toEqual({ text: 'short', size: 100 });
  });

  it('wraps words greedily and ends an overflowing last line with an ellipsis', () => {
    expect(wrapText('one two three four', 'sans', 10, 60, measure, 5)).toEqual(['one two', 'three four']);
    const clipped = wrapText('one two three four five six', 'sans', 10, 60, measure, 2);
    expect(clipped).toHaveLength(2);
    expect(clipped[1]!.endsWith('…')).toBe(true);
    for (const line of clipped) expect(measure(line, 'sans', 10)).toBeLessThanOrEqual(60);
  });
});

describe('clip timing', () => {
  it('holds the first frame, runs linearly and holds the last frame', () => {
    expect(clipProgress(0, 14)).toBe(0);
    expect(clipProgress(0.5, 14)).toBe(0);
    expect(clipProgress(14, 14)).toBe(1);
    expect(clipProgress(12.5, 14)).toBe(1);
    const mid = clipProgress(0.5 + (14 - 2) / 2, 14);
    expect(mid).toBeCloseTo(0.5, 5);
    let last = -1;
    for (let t = 0; t <= 14; t += 0.25) {
      const p = clipProgress(t, 14);
      expect(p).toBeGreaterThanOrEqual(last);
      last = p;
    }
  });
});

describe('story frame', () => {
  const input = (over: Partial<StoryInput> = {}): StoryInput => ({
    title: 'Hoa hướng dương',
    subtitle: 'Helianthus annuus',
    art: { inner: '<g/>' },
    headline: 'Nở rộ',
    detail: 'Giai đoạn 8/9',
    progress: { value: 0.5, ticks: [0.2, 0.4] },
    disclaimer: 'Minh họa mô phỏng',
    watermark: 'bloomora.example/vi',
    tint: '#f4a7c3',
    ...over,
  });

  it('keeps every text and shape inside the 9:16 canvas, with the card above the caption', () => {
    const f = buildStoryFrame(input({ kicker: 'Trắc nghiệm vui' }), measure);
    expect([f.width, f.height]).toEqual([STORY_W, STORY_H]);
    expect(f.card.x + f.card.w).toBeLessThanOrEqual(STORY_W);
    for (const t of f.texts) {
      expect(t.y, t.text).toBeGreaterThan(0);
      expect(t.y, t.text).toBeLessThan(STORY_H);
      const w = measure(t.text, t.face, t.size);
      const left = t.align === 'center' ? t.x - w / 2 : t.x;
      expect(left, t.text).toBeGreaterThanOrEqual(0);
      expect(left + w, t.text).toBeLessThanOrEqual(STORY_W);
    }
    const headline = f.texts.find((t) => t.text === 'Nở rộ')!;
    expect(headline.y).toBeGreaterThan(f.card.y + f.card.h);
    expect(f.pill.y + f.pill.h).toBeLessThanOrEqual(STORY_H);
    expect(f.art.crop).toEqual(ART_CROP);
  });

  it('clamps the growth bar and omits it when there is no progress', () => {
    expect(buildStoryFrame(input({ progress: { value: 3, ticks: [] } }), measure).bar!.value).toBe(1);
    expect(buildStoryFrame(input({ progress: undefined }), measure).bar).toBeNull();
  });

  it('survives very long names and descriptions without leaving the canvas', () => {
    const long = 'Rất rất dài '.repeat(30);
    const f = buildStoryFrame(input({ title: long, subtitle: long, headline: long, detail: long, watermark: `${'x'.repeat(120)}.example` }), measure);
    for (const t of f.texts) {
      const w = measure(t.text, t.face, t.size);
      expect(t.align === 'center' ? w : w + t.x, t.text.slice(0, 20)).toBeLessThanOrEqual(STORY_W + 1);
    }
  });
});

describe('moment story', () => {
  it('describes the stage at a playback position, in the visitor language', () => {
    const story = createMomentStory(momentData());
    const first = story.at(0);
    const bloom = story.at(story.progressOf('full-bloom'));
    expect(first.headline).toBe('Hạt giống');
    expect(bloom.headline).toBe('Nở rộ');
    expect(bloom.detail).toMatch(/^Giai đoạn 8\/9 · Ước tính: /);
    expect(bloom.title).toBe('Hoa hướng dương');
    expect(bloom.disclaimer).toBe(dict.player.illustrative);
    expect(bloom.progress!.ticks).toHaveLength(sunflower.stages.length - 1);
    expect(bloom.art.inner).toContain('<defs>');
  });

  it('is deterministic and always shows different art for different stages', () => {
    const story = createMomentStory(momentData());
    expect(story.at(0.4).art.inner).toBe(story.at(0.4).art.inner);
    expect(story.at(0.1).art.inner).not.toBe(story.at(0.9).art.inner);
  });

  it('strips the protocol and trailing slash for the watermark', () => {
    expect(brandAddress('https://owner.github.io/bloomora/vi/flowers/hoa-sen/')).toBe('owner.github.io/bloomora/vi/flowers/hoa-sen');
  });
});

describe('quiz story', () => {
  it('puts the result on a nine-stage bar', () => {
    const s = quizStory({
      kicker: 'k',
      title: 't',
      withFlower: 'cùng Hoa sen',
      headline: 'h',
      detail: 'd',
      artInner: '<g/>',
      stageIndex: 3,
      total: 9,
      disclaimer: 'x',
      brandUrl: 'b',
      tint: '#fff',
    });
    expect(s.progress!.ticks).toHaveLength(8);
    expect(s.progress!.value).toBeCloseTo(3.5 / 9, 6);
    expect(s.subtitle).toBe('cùng Hoa sen');
  });
});

describe('svg renderer', () => {
  it('draws the frame with the supplied text and the illustration cropped into the card', () => {
    const story = createMomentStory(momentData());
    const frame = buildStoryFrame(story.at(0.6), measure);
    const svg = storyToSvg(frame, (t) => `<text>${t.text}</text>`);
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg).toContain(`viewBox="0 0 ${STORY_W} ${STORY_H}"`);
    expect(svg).toContain(`viewBox="${ART_CROP.x} ${ART_CROP.y} ${ART_CROP.w} ${ART_CROP.h}"`);
    expect(svg).toContain('<text>Hoa hướng dương</text>');
    expect(svg.match(/<svg/g)).toHaveLength(2); // root + the nested illustration
    expect(svg.endsWith('</svg>')).toBe(true);
  });
});
