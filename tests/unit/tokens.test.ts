import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(join(__dirname, '..', '..', 'src', 'styles', 'tokens.css'), 'utf8');

function block(selector: RegExp): Record<string, string> {
  const m = selector.exec(css);
  expect(m, String(selector)).not.toBeNull();
  const start = css.indexOf('{', m!.index) + 1;
  const end = css.indexOf('\n}', start);
  const vars: Record<string, string> = {};
  for (const d of css.slice(start, end).matchAll(/(--[a-z0-9-]+):\s*([^;]+);/gi)) vars[d[1]!] = d[2]!.trim();
  return vars;
}

const light = block(/^:root\s*\{/m);
const dark = { ...light, ...block(/:root\[data-theme='dark'\]\s*\{/) };

function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0]! + 0.7152 * ch[1]! + 0.0722 * ch[2]!;
}
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

const TEXT_PAIRS: [string, string][] = [
  ['--text', '--bg'],
  ['--text', '--surface-solid'],
  ['--text-muted', '--surface-solid'],
  ['--text-muted', '--bg'],
  ['--text-faint', '--surface-solid'],
  ['--accent', '--surface-solid'],
  ['--accent-contrast', '--accent'],
  ['--accent-contrast', '--accent-strong'],
  ['--leaf', '--surface-solid'],
  ['--danger', '--surface-solid'],
];

describe('WCAG 2.2 AA colour contrast of design tokens', () => {
  for (const [name, theme] of [['light', light], ['dark', dark]] as const) {
    describe(name, () => {
      it.each(TEXT_PAIRS)('%s on %s ≥ 4.5:1', (fg, bg) => {
        const f = theme[fg];
        const b = theme[bg];
        expect(f, fg).toMatch(/^#[0-9a-f]{6}$/i);
        expect(b, bg).toMatch(/^#[0-9a-f]{6}$/i);
        expect(contrast(f!, b!)).toBeGreaterThanOrEqual(4.5);
      });
      it('focus ring ≥ 3:1 against the page surface', () => {
        expect(contrast(theme['--focus']!, theme['--surface-solid']!)).toBeGreaterThanOrEqual(3);
      });
    });
  }

  it('defines the 44px minimum target size', () => {
    expect(light['--tap']).toBe('2.75rem');
  });
});
