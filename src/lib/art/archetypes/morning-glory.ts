import {
  CX,
  GROUND_Y,
  clamp01,
  darken,
  f,
  lighten,
  linearGradient,
  mix,
  radialGradient,
  ramp,
  smooth,
  type Ctx,
} from '../core';
import { SEED_Y, roots } from '../scene';
import type { ArchetypeRenderer } from './types';

const MAX_H = 352;
const UNDER = SEED_Y - GROUND_Y;
const PERIOD = 92;

function vinePoint(y: number, ampBase = 20): { x: number; depth: number } {
  const th = ((SEED_Y - y) / PERIOD) * Math.PI * 2;
  const amp = ampBase + 4 * Math.sin(y * 0.03);
  return { x: CX + Math.sin(th) * amp, depth: Math.cos(th) };
}

function stake(): string {
  const top = GROUND_Y - MAX_H - 26;
  let nodes = '';
  for (let y = GROUND_Y - 40; y > top; y -= 78) nodes += `M${CX - 5} ${y}h10`;
  return (
    `<g aria-hidden="true"><path d="M${CX} ${GROUND_Y + 22}V${top}" stroke="#9d8450" stroke-width="10" stroke-linecap="round"/>` +
    `<path d="M${CX - 1.5} ${GROUND_Y + 22}V${top}" stroke="#d8c48a" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="${nodes}" stroke="#7a6636" stroke-width="2.2" fill="none"/></g>`
  );
}

function cordate(x: number, y: number, ang: number, sc: number, flip: number): string {
  return `transform="translate(${f(x)} ${f(y)}) rotate(${f(ang)}) scale(${f(sc)} ${f(sc * flip)})"`;
}

const HEART = 'M0 0C-10 -14 -8 -26 6 -26C28 -26 46 -10 58 0C46 10 28 26 6 26C-8 26 -10 14 0 0Z';

function flowerAt(c: Ctx, x: number, y: number, side: number, idx: number): string {
  const { s, pal } = c;
  const delay = idx * 0.1;
  const sh = (v: number) => clamp01((v - delay) / (1 - delay));
  const bud = ramp(delay * 0.3, 1, s.bud);
  const open = sh(s.open);
  const wilt = sh(s.wilt);
  const fruit = sh(s.fruit);
  if (bud < 0.04) return '';
  const px = x + side * 34;
  const py = y - 16;
  let g = `<path d="M${f(x)} ${f(y)}Q${f(x + side * 14)} ${f(y - 22)} ${f(px)} ${f(py)}" fill="none" stroke="${pal.stem}" stroke-width="2.6" stroke-linecap="round"/>`;
  const S = 0.78 + (idx % 2) * 0.22;
  if (fruit > 0.12 && wilt > 0.6) {
    const m = smooth(0.12, 1, fruit);
    const col = mix('#79a04a', '#8a7a46', m * 0.7);
    g += `<g transform="translate(${f(px)} ${f(py)})">` +
      `<circle cy="${f(-4 * m)}" r="${f(5 + 6 * m)}" fill="${col}" stroke="${darken(col, 0.35)}" stroke-width="1"/>` +
      [-50, -25, 0, 25, 50].map((a) => `<path transform="rotate(${a}) translate(0 ${f(-2 * m)})" d="M0 0C-3 -5 -2 -10 0 -13C2 -10 3 -5 0 0Z" fill="${pal.leaf}" stroke="${darken(pal.leafDeep, 0.2)}" stroke-width=".5"/>`).join('') +
      `</g>`;
    return g;
  }
  const budOp = 1 - smooth(0.02, 0.22, open);
  if (budOp > 0.02) {
    const len = 14 + 42 * bud;
    g += `<g transform="translate(${f(px)} ${f(py)}) rotate(${f(side * 24)})" opacity="${f(budOp)}">` +
      `<path d="M0 0C${f(-9 * S)} -8 ${f(-8 * S)} ${f(-len * 0.7)} 0 ${f(-len)}C${f(8 * S)} ${f(-len * 0.7)} ${f(9 * S)} -8 0 0Z" fill="${mix(pal.petal, '#ffffff', 0.25)}" stroke="${darken(pal.petalDeep, 0.1)}" stroke-width=".9"/>` +
      `<path d="M0 -3Q${f(-5 * S)} ${f(-len * 0.4)} ${f(2 * S)} ${f(-len * 0.88)}M${f(3 * S)} -5Q${f(-2 * S)} ${f(-len * 0.45)} ${f(4 * S)} ${f(-len * 0.8)}" fill="none" stroke="${darken(pal.petalDeep, 0.2)}" stroke-width=".8" opacity=".6"/>` +
      `<path d="M${f(-6 * S)} 2l${f(6 * S)} -6l${f(6 * S)} 6" fill="${pal.leaf}" stroke="${darken(pal.leafDeep, 0.2)}" stroke-width=".8"/>` +
      `</g>`;
  }
  const front = smooth(0.05, 0.6, open);
  if (front > 0.02) {
    const R = 40 * S * front * (1 - 0.5 * wilt);
    const rot = idx * 17 + wilt * 40;
    const petalFill = wilt > 0.05 ? mix(pal.petal, '#8a6a9a', wilt * 0.8) : c.url('mgPetal');
    let pleats = '';
    let star = '';
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      pleats += `M0 0L${f(Math.cos(a) * R * 0.98)} ${f(Math.sin(a) * R * 0.98)}`;
      const a2 = a + Math.PI / 5;
      star += `${i === 0 ? 'M' : 'L'}${f(Math.cos(a) * R * 0.62)} ${f(Math.sin(a) * R * 0.62)}L${f(Math.cos(a2) * R * 0.2)} ${f(Math.sin(a2) * R * 0.2)}`;
    }
    // slightly scalloped rim
    let rim = '';
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const r = R * (i % 2 === 0 ? 1.02 : 0.96);
      rim += `${i === 0 ? 'M' : 'L'}${f(Math.cos(a) * r)} ${f(Math.sin(a) * r)}`;
    }
    g += `<g transform="translate(${f(px + side * 8)} ${f(py - 22 * front)}) rotate(${f(rot)}) scale(1 .94)">` +
      `<path d="${rim}Z" fill="${petalFill}" stroke="${darken(pal.petalDeep, 0.2)}" stroke-width="1" stroke-linejoin="round"/>` +
      `<path d="${pleats}" stroke="${pal.petalDeep}" stroke-width=".9" opacity=".55"/>` +
      `<path d="${star}Z" fill="${lighten(pal.petalTip ?? pal.petal, 0.45)}" opacity="${f(0.8 * (1 - wilt))}"/>` +
      `<circle r="${f(R * 0.14)}" fill="#fff8d8" stroke="#d8c870" stroke-width=".6"/>` +
      `</g>`;
  }
  return g;
}

export const morningGlory: ArchetypeRenderer = {
  defs(c) {
    const p = c.pal;
    return (
      linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0) +
      radialGradient(c.id('mgPetal'), [[0, '#ffffff'], [0.16, lighten(p.petal, 0.55)], [0.5, p.petal], [1, p.petalDeep]], 0.5, 0.5, 0.52)
    );
  },
  scene: undefined,
  plant(c) {
    const { s, pal } = c;
    let out = roots(c, { depth: 56, spread: 120, laterals: 7 });
    // Support stake.
    // (drawn after the 'behind' part of the vine so the vine can wind around it)
    if (s.seed > 0.02) {
      out += `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(-24)" opacity="${f(clamp01(s.seed))}" aria-hidden="true"><path d="M-9 -12L9 -14L12 6L2 14L-10 8Z" fill="#2c2623" stroke="#120e0c" stroke-width="1.2"/><path d="M-6 -8L6 -10" stroke="#6a5a4e" stroke-width="1.4" opacity=".6"/></g>`;
    }
    const total = s.stem * (MAX_H + UNDER);
    const topY = SEED_Y - total;
    const dry = smooth(0.2, 1, s.wilt);
    const vineCol = mix(pal.stem, '#8c7a3c', dry * 0.55);
    // Build samples.
    const behind: string[] = [];
    const frontP: string[] = [];
    let curBehind: [number, number][] = [];
    let curFront: [number, number][] = [];
    const push = (runs: string[], pts: [number, number][]) => {
      if (pts.length > 1) runs.push(pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${f(p[0])} ${f(p[1])}`).join(''));
    };
    const sway = c.sway * 4;
    const samples: { x: number; y: number }[] = [];
    if (s.stem > 0.01) {
      for (let y = SEED_Y; y >= topY - 0.1; y -= 5) {
        const { x, depth } = vinePoint(y);
        const px = x + sway * ramp(0.3, 1, (SEED_Y - y) / (MAX_H + UNDER));
        samples.push({ x: px, y });
        const isFront = depth >= 0;
        if (isFront) {
          if (curBehind.length) {
            curBehind.push([px, y]);
            push(behind, curBehind);
            curBehind = [];
          }
          curFront.push([px, y]);
        } else {
          if (curFront.length) {
            curFront.push([px, y]);
            push(frontP, curFront);
            curFront = [];
          }
          curBehind.push([px, y]);
        }
      }
      push(behind, curBehind);
      push(frontP, curFront);
    }
    const stroke = (d: string) =>
      `<path d="${d}" fill="none" stroke="${darken(vineCol, 0.25)}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="${d}" fill="none" stroke="${vineCol}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (behind.length) out += stroke(behind.join(''));
    out += stake();
    if (frontP.length) out += stroke(frontP.join(''));
    // Leaves along the vine.
    const leafAmt = smooth(0.0, 1, s.leaf);
    const sampleAtHeight = (h: number) => samples[Math.min(samples.length - 1, Math.max(0, Math.round(((SEED_Y - (GROUND_Y - h)) / 5) | 0)))];
    if (samples.length > 3) {
      const nLeaves = 9;
      for (let i = 0; i < nLeaves; i++) {
        const hf = 0.1 + (i / nLeaves) * 0.82;
        const y = GROUND_Y - hf * MAX_H;
        if (y < topY + 4) continue;
        const reveal = smooth((i / nLeaves) * 0.8, (i / nLeaves) * 0.8 + 0.25, leafAmt);
        if (reveal < 0.03) continue;
        const sm = sampleAtHeight(hf * MAX_H);
        if (!sm) continue;
        const side = i % 2 === 0 ? 1 : -1;
        const sc = (0.85 + 0.3 * (1 - hf)) * reveal * (0.5 + 0.5 * smooth(0.1, 0.9, s.leaf));
        const px = sm.x + side * 22 * sc;
        const py = sm.y - 8 * sc;
        const col = dry > 0.05 ? mix(pal.leaf, '#a08c45', dry * 0.8) : pal.leaf;
        out += `<path d="M${f(sm.x)} ${f(sm.y)}Q${f(sm.x + side * 12 * sc)} ${f(sm.y - 10 * sc)} ${f(px)} ${f(py)}" fill="none" stroke="${vineCol}" stroke-width="2.2" stroke-linecap="round"/>`;
        out += `<path ${cordate(px, py, side > 0 ? -18 : 198, sc * 0.9, side > 0 ? 1 : -1)} d="${HEART}" fill="${dry > 0.05 ? col : c.url('leaf')}" stroke="${darken(col, 0.4)}" stroke-width="1.1"/>`;
        out += `<path ${cordate(px, py, side > 0 ? -18 : 198, sc * 0.9, side > 0 ? 1 : -1)} d="M0 0L50 0M14 0L30 -12M14 0L30 12" stroke="${lighten(col, 0.5)}" stroke-width="1.3" fill="none" opacity=".7" stroke-linecap="round"/>`;
      }
    }
    // Cotyledons.
    const coty = smooth(0.02, 0.2, s.stem) * (1 - smooth(0.5, 0.9, s.leaf));
    if (coty > 0.02 && samples.length) {
      const top = samples[samples.length - 1]!;
      for (const side of [-1, 1]) {
        out += `<path transform="translate(${f(top.x)} ${f(top.y)}) rotate(${side < 0 ? 196 : -16}) scale(${f(coty)} ${f(coty * side * -1)})" d="M0 0C4 -10 18 -16 28 -8L24 -2L30 4C20 14 6 10 0 0Z" fill="${c.url('leaf')}" stroke="${darken(pal.leafDeep, 0.2)}" stroke-width="1"/>`;
      }
    }
    // Flowers.
    if (s.bud > 0.03 && samples.length > 10) {
      const spots = [0.4, 0.55, 0.69, 0.82, 0.92];
      spots.forEach((hf, i) => {
        if (GROUND_Y - hf * MAX_H < topY) return;
        const sm = sampleAtHeight(hf * MAX_H);
        if (!sm) return;
        out += flowerAt(c, sm.x, sm.y, i % 2 === 0 ? 1 : -1, i);
      });
    }
    return out;
  },
};
