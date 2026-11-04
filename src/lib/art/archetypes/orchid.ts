import {
  CX,
  GROUND_Y,
  clamp01,
  cubicAt,
  darken,
  f,
  lighten,
  linearGradient,
  mix,
  petalAt,
  radialGradient,
  ramp,
  ribbonPath,
  smooth,
  smoothPath,
  trimPolyline,
  type Ctx,
  type Cubic,
} from '../core';
import { SEED_Y, fallenPetals, roots, stemStroke } from '../scene';
import type { ArchetypeRenderer } from './types';

/** Orchid seed is dust: a pinch of tiny pale specks on the soil. */
function seed(k: number): string {
  if (k < 0.02) return '';
  const dots: [number, number][] = [[-14, 4], [-6, -3], [2, 5], [9, -2], [15, 5], [-1, -8], [6, 9], [-10, 9]];
  return (
    `<g transform="translate(${CX} ${SEED_Y + 6})" opacity="${f(clamp01(k))}" aria-hidden="true">` +
    dots.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="2.2" ry="1.3" fill="#d8c79a" stroke="#6a583a" stroke-width=".6"/>`).join('') +
    `</g>`
  );
}

/** Thick silvery-green roots that climb out of the pot and curl in the air. */
function airRoots(c: Ctx): string {
  const k = smooth(0.1, 0.9, c.s.root) * smooth(0.1, 0.8, c.s.leaf);
  if (k < 0.03) return '';
  const col = mix('#b9c9b0', c.pal.leaf, 0.25);
  let d = '';
  const specs: [number, number, number, number][] = [
    [-24, -50, -70, 10],
    [-10, -36, -34, 30],
    [20, -40, 52, 22],
    [28, -58, 84, 6],
  ];
  specs.forEach(([x1, y1, x2, y2], i) => {
    const pts: [number, number][] = [
      [CX + x1 * 0.2, GROUND_Y - 6],
      [CX + x1, GROUND_Y + y1 * 0.3],
      [CX + x2, GROUND_Y + y2 + i * 2],
    ];
    d += smoothPath(trimPolyline(pts, k));
  });
  return `<path d="${d}" fill="none" stroke="${darken(col, 0.3)}" stroke-width="6.4" stroke-linecap="round" opacity=".9"/><path d="${d}" fill="none" stroke="${col}" stroke-width="4.4" stroke-linecap="round"/>`;
}

/** A few broad, thick, arching leaves rising from the crown, lowest ones largest. */
function leaves(c: Ctx): string {
  const { s } = c;
  const amt = smooth(0.02, 1, s.leaf);
  if (amt < 0.02) return '';
  const dry = smooth(0.4, 1, s.wilt) * 0.3;
  const sway = c.sway * 3;
  const defs = [
    { dx: -190, rise: 54, w: 30, i: 0 },
    { dx: 186, rise: 60, w: 30, i: 1 },
    { dx: -120, rise: 110, w: 28, i: 2 },
    { dx: 124, rise: 116, w: 28, i: 3 },
    { dx: -36, rise: 140, w: 24, i: 4 },
  ];
  let out = '';
  defs.forEach((d) => {
    const g = smooth(d.i * 0.08, 0.55 + d.i * 0.08, amt);
    if (g < 0.02) return;
    const col = mix(c.pal.leaf, '#9a9a4a', dry);
    const dx = d.dx * g + sway;
    const curve: Cubic = {
      p0: [CX + d.dx * 0.04, GROUND_Y + 2],
      p1: [CX + dx * 0.35, GROUND_Y - d.rise * 1.1 * g],
      p2: [CX + dx * 0.75, GROUND_Y - d.rise * 1.0 * g],
      p3: [CX + dx, GROUND_Y - d.rise * 0.45 * g + 24 * g],
    };
    out += `<path d="${ribbonPath(curve, (t) => d.w * g * Math.sin(Math.PI * Math.pow(t, 0.6)) * (1 - 0.1 * t) + 0.6, 12)}" fill="${col}" stroke="${darken(col, 0.35)}" stroke-width="1" stroke-linejoin="round"/>`;
    const [mx, my] = cubicAt(curve, 0.5);
    void mx;
    void my;
    out += `<path d="M${f(curve.p0[0])} ${f(curve.p0[1])}C${f(curve.p1[0])} ${f(curve.p1[1])} ${f(curve.p2[0])} ${f(curve.p2[1])} ${f(curve.p3[0])} ${f(curve.p3[1])}" fill="none" stroke="${lighten(col, 0.45)}" stroke-width="1.2" opacity=".45"/>`;
  });
  return out;
}

/** One moth-shaped flower: two broad side petals, three narrower sepals and a small lip. */
function bloom(c: Ctx, x: number, y: number, rot: number, size: number, open: number, wilt: number): string {
  const { pal } = c;
  const k = 0.3 + 0.7 * open;
  const fill = wilt > 0.05 ? mix(pal.petal, '#9a8062', wilt * 0.85) : c.url('oPetal');
  const stroke = darken(pal.petalDeep, 0.15);
  const L = 36 * size * k;
  let g = '';
  // Three sepals: one up, two lower-sides.
  g += `<path d="${petalAt(0, 0, 0, 0, L * 0.95, L * 0.62, 0.5, 0.5)}" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`;
  g += `<path d="${petalAt(0, 0, -128, 0, L * 0.9, L * 0.56, 0.5, 0.5)}" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`;
  g += `<path d="${petalAt(0, 0, 128, 0, L * 0.9, L * 0.56, 0.5, 0.5)}" fill="${fill}" stroke="${stroke}" stroke-width=".8"/>`;
  // Two very broad petals spread to the sides, overlapping the sepals.
  g += `<path d="${petalAt(0, 0, -78, 0, L * 1.05, L * 1.0, 0.1, 0.55)}" fill="${fill}" stroke="${stroke}" stroke-width=".9"/>`;
  g += `<path d="${petalAt(0, 0, 78, 0, L * 1.05, L * 1.0, 0.1, 0.55)}" fill="${fill}" stroke="${stroke}" stroke-width=".9"/>`;
  // Lip and column.
  g += `<path d="${petalAt(0, L * 0.05, 180, 0, L * 0.5, L * 0.34, 0.7, 0.45)}" fill="${mix(pal.petalDeep, pal.center, 0.4)}" stroke="${darken(pal.petalDeep, 0.4)}" stroke-width=".7"/>`;
  g += `<ellipse cy="${f(-L * 0.06)}" rx="${f(L * 0.1)}" ry="${f(L * 0.14)}" fill="${pal.center}" stroke="${pal.centerDeep}" stroke-width=".6"/>`;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}

/** The arching flower spike: a bare wiry stem with buds that open from the base outward. */
function spike(c: Ctx): string {
  const { s, pal } = c;
  const bud = ramp(0, 0.45, s.bud);
  if (bud < 0.02) return '';
  const wilt = smooth(0, 1, s.wilt);
  const sway = c.sway * 3;
  const reach = 270 * bud;
  const droop = wilt * 10;
  const curve: Cubic = {
    p0: [CX + 8, GROUND_Y - 6],
    p1: [CX + 14, GROUND_Y - reach * 0.7],
    p2: [CX + 50 + sway, GROUND_Y - reach * 0.98],
    p3: [CX + 150 * bud + sway, GROUND_Y - reach * 0.72 + droop],
  };
  let out = stemStroke(curve, 4.2, mix(pal.stem, '#7a5a4a', 0.35));
  const full = ramp(0.3, 1, s.bud);
  const n = 7;
  const slots: string[] = [];
  for (let i = 0; i < n; i++) {
    const t = 0.34 + (i / (n - 1)) * 0.66;
    const reveal = ramp(i / n * 0.8, i / n * 0.8 + 0.3, full);
    if (reveal < 0.03) continue;
    const [x, y] = cubicAt(curve, t);
    const size = (1.05 - 0.4 * (i / n)) * reveal;
    const o = ramp(i * 0.07, i * 0.07 + 0.45, s.open);
    const side = i % 2 === 0 ? 1 : -1;
    // Flowers fall from the tip back when spent: the oldest, lowest ones go last on an orchid.
    if (wilt > 0.45 && smooth(0.45, 1, wilt) > 0.2 + (i / n) * 0.8) continue;
    const bx = x + side * 4;
    if (o < 0.06) {
      slots.push(`<ellipse cx="${f(bx)}" cy="${f(y - 5)}" rx="${f(5 * size)}" ry="${f(8 * size)}" fill="${mix(pal.petal, pal.leaf, 0.45)}" stroke="${darken(pal.petalDeep, 0.3)}" stroke-width=".8"/>`);
    } else {
      slots.push(bloom(c, bx, y, side * 12 + (wilt * side * 14), size, o, wilt));
    }
  }
  // Draw the lower (older) flowers last so they overlap the buds above them.
  out += slots.reverse().join('');
  return out;
}

export const orchid: ArchetypeRenderer = {
  defs(c) {
    const p = c.pal;
    return (
      radialGradient(c.id('oPetal'), [[0, lighten(p.petal, 0.4)], [0.55, p.petal], [1, p.petalDeep]], 0.5, 0.9, 1, 0.5, 0.9) +
      linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0)
    );
  },
  plant(c) {
    const { s } = c;
    let out = seed(s.seed) + roots(c, { depth: 70, spread: 110, laterals: 7, color: '#d9e0cc' });
    if (s.stem > 0.01 && s.leaf < 0.03) {
      // Tiny protocorm: a pale green bead before the first leaf.
      out += `<ellipse cx="${CX}" cy="${f(SEED_Y - 30 * ramp(0, 0.3, s.stem))}" rx="${f(5 + 8 * s.stem)}" ry="${f(4 + 6 * s.stem)}" fill="${c.pal.leaf}" stroke="${c.pal.leafDeep}" stroke-width="1"/>`;
    }
    out += airRoots(c) + leaves(c) + spike(c);
    if (s.wilt > 0.4) out += fallenPetals(c, smooth(0.4, 1, s.wilt) * 7, c.pal.petal, { spread: 170, size: 16, air: 0.05 });
    return out;
  },
};
