/**
 * Hoa súng (water lily): round pads that lie flat on the water with a V-shaped notch, and a star-shaped
 * flower that sits right at the surface on a slim stalk. Shares the pond scene with the lotus.
 */
import { CX, clamp01, cubicAt, cubicD, darken, dotsPath, f, lerp, lighten, mix, petalAt, ramp, smooth, type Ctx, type Cubic } from '../core';
import { fallenPetals, roots } from '../scene';
import { lotus } from './lotus';
import type { ArchetypeRenderer } from './types';

const WATER_Y = 388;
const BASE_Y = 540;

function stalk(curve: Cubic, w: number, color: string): string {
  const d = cubicD(curve);
  return `<path d="${d}" fill="none" stroke="${darken(color, 0.25)}" stroke-width="${f(w + 1.6)}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${f(w)}" stroke-linecap="round"/>`;
}

/** A flat pad seen at a low angle, with a notch cut towards the centre. */
function pad(c: Ctx, x: number, y: number, rx: number, ry: number, notch: number, dry: number): string {
  const a0 = ((notch + 9) * Math.PI) / 180;
  const a1 = ((notch - 9) * Math.PI) / 180;
  const p = (a: number) => `${f(Math.cos(a) * rx)} ${f(Math.sin(a) * ry)}`;
  const fill = dry > 0.05 ? mix(c.pal.leaf, '#9a8a4a', dry * 0.8) : c.url('lotusPad');
  let veins = '';
  for (let i = 0; i < 10; i++) {
    const a = a0 + ((i + 0.5) / 10) * (Math.PI * 2 - (a0 - a1));
    veins += `M0 0L${f(Math.cos(a) * rx * 0.92)} ${f(Math.sin(a) * ry * 0.92)}`;
  }
  return (
    `<g transform="translate(${f(x)} ${f(y)})">` +
    `<path d="M0 0L${p(a0)}A${f(rx)} ${f(ry)} 0 1 1 ${p(a1)}Z" fill="${fill}" stroke="${darken(c.pal.leafDeep, 0.2)}" stroke-width="1.1" stroke-linejoin="round"/>` +
    `<path d="${veins}" stroke="${lighten(c.pal.leaf, 0.5)}" stroke-width=".9" opacity=".45" fill="none"/>` +
    `</g>`
  );
}

function bloom(c: Ctx, x: number, y: number): string {
  const { s, pal } = c;
  const bud = smooth(0, 1, s.bud);
  if (bud < 0.03) return '';
  const open = smooth(0, 1, s.open);
  const wilt = smooth(0, 1, s.wilt);
  const size = 0.35 + 0.65 * Math.pow(bud, 0.85);
  let g = '';
  const layers = [
    { n: 9, len: 76, wid: 19, spread: 84, fill: 'lotusPetalOut' },
    { n: 7, len: 62, wid: 18, spread: 62, fill: 'lotusPetalMid' },
    { n: 5, len: 46, wid: 16, spread: 36, fill: 'lotusPetalIn' },
  ];
  const sink = wilt * 14;
  layers.forEach((layer, li) => {
    let d = '';
    for (let i = 0; i < layer.n; i++) {
      if (wilt > 0.3 && smooth(0.3, 1, wilt) * 1.2 > (i + 1) / layer.n) continue;
      const t = i / (layer.n - 1) - 0.5;
      const a = t * 2 * lerp(6, layer.spread, open) * (1 - 0.35 * wilt);
      d += petalAt(0, 0, a, 0, layer.len * size * (0.62 + 0.38 * open) * (1 - 0.3 * wilt), layer.wid * size, 0.82, 0.5);
    }
    const fill = wilt > 0.05 ? mix(pal.petal, '#9a8aa0', wilt * 0.8) : c.url(layer.fill);
    g += `<path d="${d}" fill="${fill}" stroke="${darken(pal.petalDeep, 0.15)}" stroke-width=".9" stroke-linejoin="round"/>`;
    if (li === 1) {
      // The golden stamens sit between the middle and inner petals.
      const dots: { x: number; y: number; r: number }[] = [];
      for (let k = 0; k < 14; k++) {
        const t2 = k / 13 - 0.5;
        dots.push({ x: t2 * 30 * size, y: -(8 + (1 - Math.abs(t2) * 1.4) * 9) * size * open, r: 1.7 * size });
      }
      g += `<ellipse cx="0" cy="-3" rx="${f(15 * size)}" ry="${f(6 * size)}" fill="${pal.center}" stroke="${pal.centerDeep}" stroke-width=".8"/>`;
      g += `<path d="${dotsPath(dots)}" fill="${pal.center}" stroke="${pal.centerDeep}" stroke-width=".5" opacity="${f(clamp01(open + 0.2))}"/>`;
    }
  });
  g += `<ellipse cx="0" cy="3" rx="${f(10 * size)}" ry="${f(5 * size)}" fill="${pal.leaf}" stroke="${darken(pal.leafDeep, 0.2)}" stroke-width=".9"/>`;
  return `<g transform="translate(${f(x)} ${f(y + sink)})">${g}</g>`;
}

export const waterLily: ArchetypeRenderer = {
  defs: (c) => lotus.defs(c),
  scene: (c) => lotus.scene!(c),
  overlay: (c) => lotus.overlay!(c),
  plant(c) {
    const { s, pal } = c;
    const sway = c.sway * 3 * ramp(0.3, 1, s.stem);
    const dry = smooth(0.15, 1, s.wilt);
    let out = '';
    if (s.seed > 0.02) {
      out += `<g transform="translate(${CX} ${BASE_Y - 2}) rotate(-10)" opacity="${f(clamp01(s.seed))}" aria-hidden="true"><ellipse rx="11" ry="8" fill="#5a4026" stroke="#2a1d10" stroke-width="1.2"/><path d="M-6 -2Q0 -6 6 -2" stroke="#a8865a" stroke-width="1.4" fill="none" opacity=".6"/></g>`;
    }
    out += roots(c, { x: CX, y: BASE_Y + 6, depth: 30, spread: 130, laterals: 6, color: '#e6d8b4' });
    const leafK = smooth(0.02, 1, s.leaf);
    const pads = [
      { dx: -190, rx: 62, notch: 200 },
      { dx: -112, rx: 52, notch: 330 },
      { dx: -36, rx: 58, notch: 250 },
      { dx: 88, rx: 64, notch: 20 },
      { dx: 172, rx: 54, notch: 300 },
      { dx: 232, rx: 40, notch: 150 },
    ];
    pads.forEach((p, i) => {
      const k = smooth(i * 0.07, i * 0.07 + 0.3, leafK);
      if (k < 0.03) return;
      const lx = CX + p.dx + sway * 0.5;
      const curve: Cubic = { p0: [CX + p.dx * 0.12, BASE_Y], p1: [CX + p.dx * 0.2, BASE_Y - 70], p2: [lx - p.dx * 0.06, WATER_Y + 70], p3: [lx, WATER_Y + 7] };
      out += stalk(curve, 2.6, pal.stem);
      out += pad(c, lx, WATER_Y + 6, p.rx * 1.15 * k, p.rx * 0.3 * k, p.notch, dry);
    });
    if (s.stem > 0.01) {
      const topY = lerp(BASE_Y, WATER_Y - 4, s.stem);
      const curve: Cubic = { p0: [CX + 30, BASE_Y], p1: [CX + 34, BASE_Y - (BASE_Y - topY) * 0.4], p2: [CX + 22 + sway, topY + (BASE_Y - topY) * 0.25], p3: [CX + 24 + sway, topY] };
      out += stalk(curve, 3.4, mix(pal.stem, '#8c7a3c', dry * 0.5));
      if (s.bud > 0.02 && s.stem > 0.7) {
        const [fx, fy] = cubicAt(curve, 1);
        out += bloom(c, fx, fy);
      }
    }
    if (s.wilt > 0.3) out += fallenPetals(c, smooth(0.3, 1, s.wilt) * 7, pal.petal, { y: WATER_Y + 8, spread: 200, size: 14, air: 0.05 });
    return out;
  },
};
