import {
  CX,
  H,
  W,
  clamp01,
  darken,
  dotsPath,
  f,
  lerp,
  lighten,
  linearGradient,
  mix,
  mulberry32,
  petalAt,
  radialGradient,
  ramp,
  smooth,
  cubicAt,
  cubicD,
  type Ctx,
  type Cubic,
} from '../core';
import { fallenPetals, roots } from '../scene';
import type { ArchetypeRenderer } from './types';

const WATER_Y = 388;
const MUD_Y = 498;
const BASE_Y = 540;
const MAX_H = BASE_Y - 118;

function stalk(_c: Ctx, curve: Cubic, w: number, color: string, prickles = false): string {
  const d = cubicD(curve);
  let out =
    `<path d="${d}" fill="none" stroke="${darken(color, 0.25)}" stroke-width="${f(w + 2)}" stroke-linecap="round"/>` +
    `<path d="${d}" fill="none" stroke="${color}" stroke-width="${f(w)}" stroke-linecap="round"/>`;
  if (prickles) {
    const dots: { x: number; y: number; r: number }[] = [];
    for (let i = 1; i < 24; i++) {
      const [x, y] = cubicAt(curve, i / 24);
      dots.push({ x: x + (i % 2 ? 2.4 : -2.4) * (w / 7), y, r: 0.9 });
    }
    out += `<path d="${dotsPath(dots)}" fill="${lighten(color, 0.45)}" opacity=".7"/>`;
  }
  return out;
}

function pad(c: Ctx, x: number, y: number, rx: number, ry: number, tilt: number, dry: number): string {
  const veins: string[] = [];
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    veins.push(`M0 0L${f(Math.cos(a) * rx * 0.96)} ${f(Math.sin(a) * ry * 0.96)}`);
  }
  const fill = dry > 0.05 ? mix(c.pal.leaf, '#9a8a4a', dry * 0.8) : c.url('lotusPad');
  return (
    `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(tilt)})">` +
    `<ellipse rx="${f(rx)}" ry="${f(ry)}" fill="${fill}" stroke="${darken(c.pal.leafDeep, 0.2)}" stroke-width="1.2"/>` +
    `<path d="${veins.join('')}" stroke="${lighten(c.pal.leaf, 0.5)}" stroke-width="1" opacity=".5" fill="none"/>` +
    `<ellipse rx="${f(rx * 0.1)}" ry="${f(ry * 0.1)}" fill="${lighten(c.pal.leaf, 0.35)}" opacity=".6"/>` +
    `</g>`
  );
}

function bloom(c: Ctx, x: number, y: number, rot: number): string {
  const { s, pal } = c;
  const bud = smooth(0, 1, s.bud);
  if (bud < 0.03) return '';
  const open = smooth(0, 1, s.open);
  const wilt = smooth(0, 1, s.wilt);
  const size = 0.3 + 0.7 * Math.pow(bud, 0.85);
  let g = '';
  // green base cup
  g += `<ellipse cx="0" cy="4" rx="${f(11 * size)}" ry="${f(8 * size)}" fill="${pal.leaf}" stroke="${darken(pal.leafDeep, 0.2)}" stroke-width="1"/>`;
  const fruit = smooth(0.05, 1, s.fruit);
  const gone = (i: number, n: number) => wilt > 0.2 && smooth(0.2, 1, wilt) * 1.2 > (i + 1) / n;
  const layers = [
    { n: 8, len: 92, wid: 42, spread: 96, ang0: 0, fill: 'lotusPetalOut' },
    { n: 7, len: 80, wid: 38, spread: 74, ang0: 6, fill: 'lotusPetalMid' },
    { n: 6, len: 64, wid: 32, spread: 48, ang0: -4, fill: 'lotusPetalIn' },
  ];
  // pod (receptacle) peeks between inner petals and remains afterwards
  const podOpen = Math.max(smooth(0.5, 1, open), fruit);
  const podMarkup = (): string => {
    if (podOpen < 0.05) return '';
    let o = '';
    const pw = (14 + 12 * fruit) * size;
    const podCol = mix(mix('#e6d36a', '#9aa23c', fruit), '#6b5a2a', smooth(0.5, 1, s.fruit) * wilt);
    o += `<path d="M${f(-pw * 0.5)} 4L${f(-pw)} ${f(-14 * size)}L${f(pw)} ${f(-14 * size)}L${f(pw * 0.5)} 4Z" fill="${podCol}" stroke="${darken(podCol, 0.35)}" stroke-width="1"/>`;
    o += `<ellipse cx="0" cy="${f(-14 * size)}" rx="${f(pw)}" ry="${f(pw * 0.34)}" fill="${lighten(podCol, 0.1)}" stroke="${darken(podCol, 0.35)}" stroke-width="1"/>`;
    const dots: { x: number; y: number; r: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      dots.push({ x: Math.cos(a) * pw * 0.55, y: -14 * size + Math.sin(a) * pw * 0.18, r: 1.8 + 1.4 * fruit });
    }
    dots.push({ x: 0, y: -14 * size, r: 2 + 1.4 * fruit });
    o += `<path d="${dotsPath(dots)}" fill="${darken(podCol, 0.55)}" opacity=".85"/>`;
    if (fruit < 0.2) {
      let st = '';
      for (let i = 0; i < 20; i++) {
        const a = (i / 20) * Math.PI;
        st += `M${f(-Math.cos(a) * pw * 1.15)} ${f(-8 * size)}l${f(-Math.cos(a) * 5)} ${f(-9 - Math.sin(a) * 4)}`;
      }
      o += `<path d="${st}" stroke="#f0cf4a" stroke-width="1.6" fill="none" opacity="${f(0.9 * (1 - wilt))}" stroke-linecap="round"/>`;
    }
    return o;
  };
  const petalMarkup = (list: typeof layers, offset: number): string => {
    let o = '';
    list.forEach((layer, li) => {
      for (let i = 0; i < layer.n; i++) {
        if (gone(i + (li + offset) * 2, 21)) continue;
        const t = layer.n === 1 ? 0 : i / (layer.n - 1) - 0.5;
        const spreadA = lerp(8, layer.spread, open) * (1 + wilt * 0.25);
        const a = t * 2 * spreadA + layer.ang0 * open;
        const lenK = 0.55 + 0.45 * Math.pow(bud, 0.85);
        const len = layer.len * size * lenK * (1 - 0.25 * wilt);
        const wid = layer.wid * size * (0.78 + 0.22 * open);
        const fill = wilt > 0.05 ? mix(pal.petal, '#9a6a60', wilt * 0.8) : c.url(layer.fill);
        o += `<path d="${petalAt(0, 4, a, 0, len, wid, 0.78, 0.5)}" fill="${fill}" stroke="${darken(pal.petalDeep, 0.15)}" stroke-width=".9" stroke-linejoin="round"/>`;
      }
    });
    return o;
  };
  // Draw order: outer + middle petals, the pod, then the inner petals in front.
  g += petalMarkup(layers.slice(0, 2), 0) + podMarkup() + petalMarkup(layers.slice(2), 2);
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}

export const lotus: ArchetypeRenderer = {
  defs(c) {
    const p = c.pal;
    const tip = p.petalTip ?? lighten(p.petal, 0.2);
    return (
      linearGradient(c.id('water'), [[0, '#9ad8d6'], [0.5, '#4fa0a8'], [1, '#235f6e']]) +
      linearGradient(c.id('mud'), [[0, '#6a5039'], [1, '#2e2018']]) +
      radialGradient(c.id('lotusPad'), [[0, lighten(p.leaf, 0.35)], [0.7, p.leaf], [1, p.leafDeep]]) +
      linearGradient(c.id('lotusPetalOut'), [[0, '#fff6f8'], [0.45, p.petal], [1, tip]], 0, 1, 0, 0) +
      linearGradient(c.id('lotusPetalMid'), [[0, '#fff0f4'], [0.5, lighten(p.petal, 0.1)], [1, tip]], 0, 1, 0, 0) +
      linearGradient(c.id('lotusPetalIn'), [[0, '#fffaf0'], [0.5, lighten(p.petal, 0.3)], [1, p.petal]], 0, 1, 0, 0)
    );
  },
  scene(c) {
    const rnd = mulberry32(5);
    const ripples = Array.from({ length: 6 }, () => ({ x: rnd() * W, y: WATER_Y + 12 + rnd() * 70, w: 40 + rnd() * 90 }));
    return (
      `<g aria-hidden="true">` +
      `<rect y="${WATER_Y}" width="${W}" height="${MUD_Y - WATER_Y + 20}" fill="${c.url('water')}"/>` +
      `<path d="M0 ${MUD_Y}Q100 ${MUD_Y - 8} 220 ${MUD_Y}T430 ${MUD_Y + 2}T640 ${MUD_Y - 2}T${W} ${MUD_Y}V${H}H0Z" fill="${c.url('mud')}"/>` +
      ripples.map((r) => `<path d="M${f(r.x)} ${f(r.y)}h${f(r.w)}" stroke="#ffffff" stroke-width="1.4" opacity=".16" stroke-linecap="round"/>`).join('') +
      `<path d="M0 ${WATER_Y}H${W}" stroke="#e8fbfb" stroke-width="2" opacity=".75"/>` +
      `</g>`
    );
  },
  plant(c) {
    const { s, pal } = c;
    const sway = c.sway * 4 * ramp(0.3, 1, s.stem);
    const dry = smooth(0.15, 1, s.wilt);
    let out = '';
    // Seed (a dark, hard-shelled nut) in the mud.
    if (s.seed > 0.02) {
      out += `<g transform="translate(${CX} ${BASE_Y - 2}) rotate(-12)" opacity="${f(clamp01(s.seed))}" aria-hidden="true"><ellipse rx="15" ry="20" fill="#3b2a1d" stroke="#1f1610" stroke-width="1.3"/><path d="M-6 -16Q0 -22 6 -16" stroke="#8a6a46" stroke-width="2" fill="none" opacity=".7"/><ellipse cx="-5" cy="-6" rx="3" ry="7" fill="#6a4e36" opacity=".5"/></g>`;
    }
    out += roots(c, { x: CX, y: BASE_Y + 6, depth: 34, spread: 150, laterals: 7, color: '#e6d8b4' });
    const total = Math.max(0.0001, s.stem * MAX_H);
    // Floating leaves first, then standing leaves.
    const leafK = smooth(0.02, 1, s.leaf);
    const floatOffsets = [-150, -86, 92, 160, 30];
    floatOffsets.forEach((dx, i) => {
      const k = smooth(i * 0.06, i * 0.06 + 0.3, leafK) * (1 - 0.35 * smooth(0.5, 1, leafK));
      if (k < 0.03) return;
      const lx = CX + dx;
      const stalkCurve: Cubic = { p0: [CX + dx * 0.15, BASE_Y], p1: [CX + dx * 0.2, BASE_Y - 70], p2: [lx - dx * 0.1, WATER_Y + 60], p3: [lx, WATER_Y + 6] };
      out += stalk(c, stalkCurve, 3, darken(pal.stem, 0.05));
      out += pad(c, lx, WATER_Y + 4, 50 * k, 12 * k, 0, dry);
    });
    const standing = [
      { dx: -128, top: 262, rx: 86, ry: 30, tilt: -6, at: 0.0 },
      { dx: 140, top: 230, rx: 92, ry: 32, tilt: 7, at: 0.12 },
      { dx: -46, top: 306, rx: 70, ry: 24, tilt: -3, at: 0.2 },
    ];
    standing.forEach((l) => {
      const k = smooth(0.3 + l.at, 0.9 + l.at * 0.4, leafK);
      if (k < 0.03) return;
      const ty = lerp(WATER_Y + 4, l.top, smooth(0, 1, k));
      const tx = CX + l.dx * lerp(0.5, 1, k);
      const stalkCurve: Cubic = {
        p0: [CX + l.dx * 0.1, BASE_Y],
        p1: [CX + l.dx * 0.15, BASE_Y - (BASE_Y - ty) * 0.5],
        p2: [tx - l.dx * 0.05 + sway, ty + (BASE_Y - ty) * 0.2],
        p3: [tx + sway * 0.8, ty],
      };
      out += stalk(c, stalkCurve, 5.5, mix(pal.stem, '#8c7a3c', dry * 0.5), true);
      out += pad(c, tx + sway * 0.8, ty - 2, l.rx * k, l.ry * k, l.tilt, dry);
    });
    // Flower stalk.
    if (s.stem > 0.01) {
      const topY = BASE_Y - total;
      const droop = smooth(0.4, 1, s.wilt) * s.open;
      const curve: Cubic = {
        p0: [CX, BASE_Y],
        p1: [CX + 6, BASE_Y - total * 0.35],
        p2: [CX - 8 + sway * 0.5, BASE_Y - total * 0.72],
        p3: [CX + sway + droop * 22, topY + droop * 14],
      };
      if (s.leaf < 0.2 && s.stem < 0.3) {
        // young shoot rising through the water
        out += stalk(c, curve, 4 + 2 * s.stem, pal.stem);
        const [tx, ty] = cubicAt(curve, 1);
        out += `<path d="M${f(tx)} ${f(ty)}c-4 -6 -3 -14 0 -20c3 6 4 14 0 20z" fill="${pal.leaf}" stroke="${darken(pal.leafDeep, 0.2)}" stroke-width=".8"/>`;
      } else {
        out += stalk(c, curve, 6 + 3 * s.stem, mix(pal.stem, '#8c7a3c', dry * 0.5), true);
      }
      if (s.bud > 0.02 && s.stem > 0.55) {
        const [fx, fy] = cubicAt(curve, 1);
        out += bloom(c, fx, fy, droop * 28 + sway * 0.6);
      }
    }
    if (s.wilt > 0.25) out += fallenPetals(c, smooth(0.25, 1, s.wilt) * 8, pal.petal, { y: WATER_Y + 6, spread: 190, size: 20, air: 0.12 });
    return out;
  },
  overlay() {
    return `<g aria-hidden="true"><rect y="${WATER_Y}" width="${W}" height="${MUD_Y - WATER_Y}" fill="#7fd0d4" opacity=".28"/><path d="M0 ${WATER_Y + 1}H${W}" stroke="#ffffff" stroke-width="1.6" opacity=".55"/></g>`;
  },
};
