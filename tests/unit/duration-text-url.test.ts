import { describe, expect, it } from 'vitest';
import { formatDayRange, formatDays, formatElapsed, pickUnit } from '../../src/lib/duration';
import { normalizeText, slugify, truncate } from '../../src/lib/text';
import { absoluteUrl, isAbsoluteHttps, normalizeBase, normalizeSite, withBase, withTrailingSlash } from '../../src/lib/url';

describe('duration', () => {
  it('chooses a unit from the upper bound', () => {
    expect(pickUnit(10)).toBe('day');
    expect(pickUnit(40)).toBe('week');
    expect(pickUnit(300)).toBe('month');
    expect(pickUnit(3650)).toBe('year');
  });
  it('formats ranges in both languages', () => {
    expect(formatDayRange([50, 110], 'en')).toBe('2–4 months');
    expect(formatDayRange([50, 110], 'vi')).toBe('2–4 tháng');
    expect(formatDayRange([3650, 7300], 'en')).toBe('10–20 years');
    expect(formatDays(1, 'en')).toBe('1 day');
    expect(formatDays(7, 'en')).toBe('7 days');
  });
  it('collapses an elapsed range at the start', () => {
    expect(formatElapsed(0, 0, 'vi')).toBe('0 ngày');
    expect(formatElapsed(0, 0.2, 'en')).toBe('0 days');
  });
});

describe('text', () => {
  it('strips Vietnamese diacritics and đ', () => {
    expect(normalizeText('Hoa Hướng Dương')).toBe('hoa huong duong');
    expect(normalizeText('Đào  Đỏ')).toBe('dao do');
    expect(normalizeText('Helianthus annuus')).toBe('helianthus annuus');
  });
  it('slugifies', () => {
    expect(slugify('Hoa cúc vạn thọ')).toBe('hoa-cuc-van-tho');
  });
  it('truncates on a word boundary', () => {
    expect(truncate('short', 20)).toBe('short');
    const t = truncate('one two three four five six seven', 20);
    expect(t.length).toBeLessThanOrEqual(20);
    expect(t.endsWith('…')).toBe(true);
  });
});

describe('url', () => {
  it('normalises the base path', () => {
    expect(normalizeBase(undefined)).toBe('/');
    expect(normalizeBase('')).toBe('/');
    expect(normalizeBase('/')).toBe('/');
    expect(normalizeBase('bloomora')).toBe('/bloomora/');
    expect(normalizeBase('/bloomora')).toBe('/bloomora/');
    expect(normalizeBase('//a//b/')).toBe('/a/b/');
  });
  it('normalises the site', () => {
    expect(normalizeSite('https://user.github.io/')).toBe('https://user.github.io');
    expect(normalizeSite('flowers.example.com')).toBe('https://flowers.example.com');
    expect(normalizeSite('')).toBe('https://bloomora.example');
  });
  it('joins base and path', () => {
    expect(withBase('/', '/vi/')).toBe('/vi/');
    expect(withBase('/bloomora/', '/vi/')).toBe('/bloomora/vi/');
    expect(withBase('/bloomora', 'vi/')).toBe('/bloomora/vi/');
  });
  it('builds absolute https URLs for a custom domain and a project site', () => {
    expect(absoluteUrl('https://flowers.example.com', '/', '/en/flowers/rose/')).toBe('https://flowers.example.com/en/flowers/rose/');
    expect(absoluteUrl('https://user.github.io', '/bloomora/', '/og-image.png')).toBe('https://user.github.io/bloomora/og-image.png');
  });
  it('recognises absolute https', () => {
    expect(isAbsoluteHttps('https://a.b/c')).toBe(true);
    expect(isAbsoluteHttps('http://a.b/c')).toBe(false);
    expect(isAbsoluteHttps('/c')).toBe(false);
  });
  it('adds trailing slashes only to non-file paths', () => {
    expect(withTrailingSlash('/vi')).toBe('/vi/');
    expect(withTrailingSlash('/sitemap.xml')).toBe('/sitemap.xml');
  });
});
