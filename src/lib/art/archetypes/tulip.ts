import {
  CX,
  GROUND_Y,
  clamp01,
  cubicAngle,
  cubicAt,
  darken,
  f,
  lerp,
  lighten,
  linearGradient,
  mix,
  petalAt,
  radialGradient,
  ramp,
  ribbonPath,
  smooth,
  type Ctx,
  type Cubic,
} from '../core';
import { SEED_Y, fallenPetals, roots, stemStroke } from '../scene';
import type { ArchetypeRenderer } from './types';

const MAX_H = 292;
const UNDER = SEED_Y - GROUND_Y;

function bulb(c: Ctx): string {
  const k = 1 - 0.45 * smooth(0.2, 1, c.s.leaf);
  const swell = 1 + 0.06 * c.s.root;
  return (
    `<g transform="translate(${CX} ${SEED_Y + 14}) scale(${f(swell)})" opacity="${f(k)}" aria-hidden="true">` +
    `<path d="M0 -40C10 -30 26 -8 24 14C22 32 10 38 0 38C-10 38 -22 32 -24 14C-26 -8 -10 -30 0 -40Z" fill="${c.url('bulb')}" stroke="#4a3320" stroke-width="1.4"/>` +
    `<path d="M0 -38C-8 -12 -9 14 -6 36M0 -38C8 -12 9 14 6 36M-14 -22C-20 -2 -19 16 -15 30M14 -22C20 -2 19 16 15 30" fill="none" stroke="#c9a46a" stroke-width="1.3" opacity=".55"/>` +
    `<path d="M-14 38Q0 46 14 38" fill="none" stroke="#6b4a2a" stroke-width="2"/>` +
    `</g>`
  );
}

function leaves(c: Ctx): string {
  const { s } = c;
  const amt = smooth(0.02, 1, s.leaf) * 0.85 + smooth(0.0, 0.3, s.stem) * 0.15;
  if (amt < 0.02 || s.stem < 0.12) return '';
  const dry = smooth(0.2, 1, s.wilt);
  const fill = dry > 0.05 ? c.url('leafDry') : c.url('tulipLeaf');
  const sway = c.sway * 4;
  const defs: { dx: number; len: number; w: number; off: number }[] = [
    { dx: 6, len: 268, w: 23, off: 0 },
    { dx: -96, len: 236, w: 21, off: -12 },
    { dx: 100, len: 226, w: 21, off: 12 },
  ];
  let out = '';
  defs.forEach((d, i) => {
    const g = smooth(i * 0.08, 0.6 + i * 0.08, amt);
    if (g < 0.02) return;
    const L = d.len * g;
    const dx = d.dx * smooth(0.15, 1, g) + sway;
    const bx = CX + d.off;
    const curve: Cubic = {
      p0: [bx, GROUND_Y + 4],
      p1: [bx + dx * 0.05, GROUND_Y - L * 0.45],
      p2: [bx + dx * 0.3, GROUND_Y - L * 0.85],
      p3: [bx + dx * (0.85 + dry * 0.1), GROUND_Y - L * (0.8 - dry * 0.25) + L * 0.2 * Math.abs(d.dx) / 90],
    };
    const d2 = ribbonPath(curve, (t) => d.w * g * Math.sin(Math.PI * Math.pow(t, 0.62)) * (1 - 0.2 * t) + 0.4, 12);
    const col = mix(c.pal.leaf, '#9a8a4a', dry * 0.7);
    out += `<path d="${d2}" fill="${fill}" stroke="${darken(col, 0.32)}" stroke-width="1" stroke-linejoin="round"/>`;
    out += `<path d="M${f(curve.p0[0])} ${f(curve.p0[1])}C${f(curve.p1[0])} ${f(curve.p1[1])} ${f(curve.p2[0])} ${f(curve.p2[1])} ${f(curve.p3[0])} ${f(curve.p3[1])}" fill="none" stroke="${lighten(col, 0.5)}" stroke-width="1.2" opacity=".5"/>`;
  });
  return out;
}

function flower(c: Ctx, x: number, y: number, rot: number): string {
  const { s, pal } = c;
  const bud = smooth(0, 1, s.bud);
  if (bud < 0.03) return '';
  const open = smooth(0, 1, s.open);
  const wilt = smooth(0, 1, s.wilt);
  const L = lerp(14, 84, Math.pow(bud, 0.9));
  const W = lerp(14, 50, Math.pow(bud, 0.8));
  const splay = lerp(3, 31, open) + wilt * 38;
  let g = '';
  // Sepal-like green at the base of a small bud.
  const green = 1 - smooth(0.2, 0.8, s.bud);
  if (green > 0.02) {
    g += `<path d="${petalAt(0, 4, 0, 0, L * 0.9, W * 0.8, 0.7, 0.45)}" fill="${mix(pal.petal, pal.leaf, green)}" stroke="${darken(pal.leafDeep, 0.2)}" stroke-width=".8"/>`;
  }
  if (open > 0.28) {
    g += `<ellipse cx="0" cy="${f(-L * 0.12)}" rx="${f(W * 0.34 * open)}" ry="${f(L * 0.2 * open)}" fill="${c.url('tulipInner')}"/>`;
    // stamens
    let st = '';
    for (let i = -2; i <= 2; i++) st += `M0 ${f(-L * 0.05)}L${f(i * 5 * open)} ${f(-L * 0.38 * open)}`;
    g += `<path d="${st}" stroke="#3a2a1a" stroke-width="1.4" fill="none" opacity="${f(0.9 * (1 - wilt))}"/>`;
    for (let i = -2; i <= 2; i++) g += `<ellipse cx="${f(i * 5 * open)}" cy="${f(-L * 0.38 * open)}" rx="1.8" ry="3.2" fill="#e9c75a" opacity="${f(1 - wilt)}"/>`;
  }
  const fillOuter = wilt > 0.08 ? mix(pal.petal, '#8a5a50', wilt * 0.8) : c.url('tulipPetal');
  const fillInner = wilt > 0.08 ? mix(pal.petalDeep, '#7a4a46', wilt * 0.8) : c.url('tulipPetalIn');
  const stroke = darken(pal.petalDeep, 0.2);
  const alive = (k: number) => !(wilt > 0.35 && smooth(0.35, 1, wilt) > 1 - k * 0.9);
  // inner tepals (behind)
  if (alive(0.2)) g += `<path d="${petalAt(0, 0, -splay * 0.55, 0, L * 0.94, W * 0.78, 0.6, 0.45)}" fill="${fillInner}" stroke="${stroke}" stroke-width=".8"/>`;
  if (alive(0.3)) g += `<path d="${petalAt(0, 0, splay * 0.55, 0, L * 0.94, W * 0.78, 0.6, 0.45)}" fill="${fillInner}" stroke="${stroke}" stroke-width=".8"/>`;
  // outer side tepals
  if (alive(0.5)) g += `<path d="${petalAt(0, 0, -splay, 0, L, W * 0.9, 0.62, 0.42)}" fill="${fillOuter}" stroke="${stroke}" stroke-width=".9"/>`;
  if (alive(0.7)) g += `<path d="${petalAt(0, 0, splay, 0, L, W * 0.9, 0.62, 0.42)}" fill="${fillOuter}" stroke="${stroke}" stroke-width=".9"/>`;
  // front tepal
  if (alive(0.9)) {
    g += `<path d="${petalAt(0, 0, wilt * 8, 0, L * 0.97, W * 0.96, 0.66, 0.42)}" fill="${fillOuter}" stroke="${stroke}" stroke-width=".9"/>`;
    g += `<path d="M0 ${f(-L * 0.12)}Q${f(W * 0.05)} ${f(-L * 0.55)} 0 ${f(-L * 0.92)}" fill="none" stroke="${lighten(pal.petalTip ?? pal.petal, 0.35)}" stroke-width="2" opacity="${f(0.5 * (1 - wilt))}" stroke-linecap="round"/>`;
  }
  // seed capsule once petals are gone
  if (s.fruit > 0.1) {
    const m = smooth(0.1, 1, s.fruit);
    g += `<g opacity="${f(m)}"><path d="M0 4C-9 -2 -10 -26 0 -34C10 -26 9 -2 0 4Z" fill="${mix('#6e9a48', '#9a8a4a', 0.4)}" stroke="#40562a" stroke-width="1"/><path d="M0 -32V3M-4.5 -28Q-6 -12 -3 2M4.5 -28Q6 -12 3 2" stroke="#40562a" stroke-width=".9" fill="none" opacity=".7"/></g>`;
  }
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}

export const tulip: ArchetypeRenderer = {
  defs(c) {
    const p = c.pal;
    return (
      linearGradient(c.id('bulb'), [[0, '#d8b57c'], [1, '#8a6238']], 0, 0, 1, 1) +
      linearGradient(c.id('tulipLeaf'), [[0, mix(p.leafDeep, '#456a6a', 0.4)], [0.6, mix(p.leaf, '#6e9a96', 0.35)], [1, mix(p.leaf, '#cfe3c8', 0.4)]], 0, 0, 1, 0) +
      linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0) +
      linearGradient(c.id('tulipPetal'), [[0, p.petalDeep], [0.55, p.petal], [1, p.petalTip ?? lighten(p.petal, 0.25)]], 0, 1, 0, 0) +
      linearGradient(c.id('tulipPetalIn'), [[0, darken(p.petalDeep, 0.2)], [1, p.petalDeep]], 0, 1, 0, 0) +
      radialGradient(c.id('tulipInner'), [[0, p.centerDeep, 0.95], [1, p.center, 0]])
    );
  },
  plant(c) {
    const { s } = c;
    let out = roots(c, { y: SEED_Y + 50, depth: 30, spread: 95, laterals: 8 });
    out += bulb(c);
    const total = Math.max(0.0001, s.stem * (MAX_H + UNDER));
    const droop = smooth(0.2, 1, s.wilt);
    const sway = c.sway * 3 * ramp(0.2, 1, s.stem);
    const topX = CX + sway + droop * 20;
    const topY = SEED_Y - 10 - total + droop * 18;
    const curve: Cubic = {
      p0: [CX, SEED_Y - 8],
      p1: [CX + 3, SEED_Y - total * 0.35],
      p2: [CX - 5 + sway * 0.5 + droop * 8, SEED_Y - total * 0.72],
      p3: [topX, topY],
    };
    out += leaves(c);
    if (s.stem > 0.015 && s.leaf < 0.05) {
      // The shoot as a pointed green spear before leaves unfurl.
      const wid = 7 + 8 * smooth(0, 0.3, s.stem);
      out += stemStroke(curve, wid, mix(c.pal.leaf, '#9ab08a', 0.2));
    } else if (s.stem > 0.015) {
      out += stemStroke(curve, 7 + 3 * s.stem, mix(c.pal.stem, '#8c7a3c', smooth(0.3, 1, s.wilt) * 0.5));
    }
    if (s.bud > 0.02 && s.stem > 0.5) {
      const ang = cubicAngle(curve, 1) + 90;
      const [fx, fy] = cubicAt(curve, 1);
      out += flower(c, fx, fy, ang * 0.6 + droop * 24);
    }
    if (s.wilt > 0.35) out += fallenPetals(c, smooth(0.35, 1, s.wilt) * 9, c.pal.petal, { spread: 150, size: 14, air: 0.1 });
    void clamp01;
    return out;
  },
};
