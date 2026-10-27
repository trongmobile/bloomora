/**
 * Single-ring "daisy" flower head with a flat yellow centre, used by cosmos.
 * Same local-state contract as `pomponHead`, so it plugs into `bushPlant`.
 */
import { darken, dotsPath, f, lighten, mix, petalAt, ramp, smooth, GOLDEN_ANGLE, type Ctx } from '../core';
import type { LocalState } from './bush';

export interface DaisyStyle {
  radius: number;
  /** petals per ring (two rings are drawn, the back one offset by half a step) */
  petals: number;
  /** petal width / length relative to radius */
  petalWid: number;
  petalLen: number;
  tip: number;
  belly: number;
  /** centre disc radius relative to radius */
  disc: number;
  calyx: string;
}

export function daisyHead(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState, style: DaisyStyle): string {
  const { pal } = c;
  const R = style.radius * scale;
  const bud = smooth(0, 1, st.bud);
  const open = smooth(0, 1, st.open);
  const wilt = smooth(0, 1, st.wilt);
  if (bud < 0.02) return '';
  const cupR = R * (0.13 + 0.2 * bud) * (1 - 0.1 * open);
  const cupCol = mix(style.calyx, '#8c7a3c', wilt * 0.6);
  let g = '';
  // Green involucre (the cup of bracts) behind the petals.
  const rx = cupR * 1.1;
  const ry = cupR * 1.25;
  g += `<path d="M0 ${f(ry * 0.9)}C${f(-rx * 1.4)} ${f(ry * 0.5)} ${f(-rx * 1.1)} ${f(-ry)} 0 ${f(-ry)}C${f(rx * 1.1)} ${f(-ry)} ${f(rx * 1.4)} ${f(ry * 0.5)} 0 ${f(ry * 0.9)}Z" fill="${cupCol}" stroke="${darken(cupCol, 0.35)}" stroke-width=".9"/>`;
  g += `<path d="M${f(-rx * 0.62)} ${f(-ry * 0.5)}Q${f(-rx * 0.3)} ${f(ry * 0.3)} ${f(-rx * 0.12)} ${f(ry * 0.85)}M${f(rx * 0.62)} ${f(-ry * 0.5)}Q${f(rx * 0.3)} ${f(ry * 0.3)} ${f(rx * 0.12)} ${f(ry * 0.85)}M0 ${f(-ry)}V${f(ry * 0.85)}" fill="none" stroke="${darken(cupCol, 0.3)}" stroke-width=".7" opacity=".6"/>`;
  // The closed bud shows a tip of colour just before it opens.
  if (open <= 0.04) {
    const peek = ramp(0.5, 1, st.bud);
    if (peek > 0) {
      g += `<path d="M${f(-rx * 0.7)} ${f(-ry * 0.55)}Q0 ${f(-ry * (1 + 0.8 * peek))} ${f(rx * 0.7)} ${f(-ry * 0.55)}Q0 ${f(-ry * 0.8)} ${f(-rx * 0.7)} ${f(-ry * 0.55)}Z" fill="${pal.petal}" stroke="${darken(pal.petalDeep, 0.2)}" stroke-width=".6"/>`;
    }
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
  }
  const k = smooth(0.02, 1, st.open);
  const petalFade = 1 - smooth(0.25, 0.95, wilt);
  const dryCol = '#9a7a6a';
  // Two rings: the back one is slightly shorter and darker, so the head reads as overlapping petals.
  for (let ring = 0; ring < 2; ring++) {
    const reveal = smooth(ring * 0.25, ring * 0.25 + 0.6, k);
    if (reveal < 0.03) continue;
    const len = R * style.petalLen * reveal * (ring === 0 ? 0.94 : 1) * (0.5 + 0.5 * petalFade);
    const wid = R * style.petalWid * (0.6 + 0.4 * reveal);
    const base = R * style.disc * 0.8;
    const col = ring === 0 ? mix(pal.petalDeep, pal.petal, 0.55) : mix(pal.petal, pal.petalTip ?? lighten(pal.petal, 0.3), 0.35);
    const fill = mix(col, dryCol, smooth(0.05, 0.9, wilt));
    let d = '';
    const n = style.petals;
    for (let i = 0; i < n; i++) {
      if (wilt > 0.3 && smooth(0.3, 1, wilt) > 1 - (((i * 5 + ring * 3) % n) / n) * 0.95) continue;
      const a = (i / n) * 360 + ring * (180 / n) + Math.sin(i * 7.7 + ring) * 3;
      d += petalAt(0, 0, a, base, len, wid, style.tip, style.belly);
    }
    g += `<path d="${d}" fill="${fill}" stroke="${darken(fill, 0.3)}" stroke-width=".7" stroke-opacity=".55" stroke-linejoin="round"/>`;
    // Faint veins on the front ring.
    if (ring === 1 && petalFade > 0.5) {
      let v = '';
      for (let i = 0; i < n; i++) {
        const a = ((i / n) * 360 + (180 / n) + Math.sin(i * 7.7 + 1) * 3) * (Math.PI / 180);
        v += `M${f(Math.sin(a) * base * 1.2)} ${f(-Math.cos(a) * base * 1.2)}L${f(Math.sin(a) * (base + len * 0.7))} ${f(-Math.cos(a) * (base + len * 0.7))}`;
      }
      g += `<path d="${v}" stroke="${pal.petalDeep}" stroke-width=".7" fill="none" opacity="${f(0.35 * reveal)}"/>`;
    }
  }
  // Centre disc: a flat yellow cushion of tiny florets.
  const discR = R * style.disc * (0.45 + 0.55 * k);
  const discCol = mix(pal.center, '#6a4a22', smooth(0.2, 1, wilt) * 0.8);
  g += `<circle r="${f(discR)}" fill="${discCol}" stroke="${darken(pal.centerDeep, 0.2)}" stroke-width=".8"/>`;
  const dots: { x: number; y: number; r: number }[] = [];
  const nd = 26;
  for (let i = 0; i < nd; i++) {
    const rr = discR * 0.86 * Math.sqrt((i + 0.5) / nd);
    dots.push({ x: Math.cos(i * GOLDEN_ANGLE) * rr, y: Math.sin(i * GOLDEN_ANGLE) * rr, r: Math.max(0.5, discR * 0.06) });
  }
  g += `<path d="${dotsPath(dots)}" fill="${pal.centerDeep}" opacity=".55"/>`;
  g += `<circle r="${f(discR * 0.97)}" fill="none" stroke="${lighten(discCol, 0.45)}" stroke-width="${f(Math.max(0.6, discR * 0.1))}" opacity=".5"/>`;
  // Slender seed head once the petals are gone.
  if (st.fruit > 0.05) {
    const m = smooth(0.05, 1, st.fruit);
    let d = '';
    const n = 22;
    for (let i = 0; i < n; i++) d += petalAt(0, 0, (i / n) * 360, R * 0.1, R * 0.4 * m, R * 0.05, 0.9, 0.4);
    g += `<path d="${d}" fill="${mix('#4a3a22', '#7a6a42', 0.35)}" stroke="#241a0e" stroke-width=".5"/>`;
    g += `<circle r="${f(R * 0.1 * m)}" fill="#b9a780"/>`;
  }
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}
