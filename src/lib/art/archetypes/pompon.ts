/**
 * Layered "pompon" flower head, shared by marigold and chrysanthemum.
 * Each layer is a single <path> of baked petals, so a 100-petal head is ~8 nodes.
 */
import { darken, f, lighten, mix, petalAt, ramp, smooth, type Ctx } from '../core';
import type { LocalState } from './bush';

export interface PomponStyle {
  radius: number;
  layers: number;
  /** petals in the outermost / innermost layer */
  outerCount: number;
  innerCount: number;
  /** petal width relative to radius (outer / inner) */
  outerWid: number;
  innerWid: number;
  /** petal length relative to radius */
  outerLen: number;
  innerLen: number;
  tip: number;
  belly: number;
  /** extra petals curl/jitter in degrees */
  jitter: number;
  calyx: string;
}

export function pomponHead(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState, style: PomponStyle): string {
  const { pal } = c;
  const R = style.radius * scale;
  const bud = smooth(0, 1, st.bud);
  const open = smooth(0, 1, st.open);
  const wilt = smooth(0.0, 1, st.wilt);
  if (bud < 0.02) return '';
  const calyxR = R * (0.12 + 0.2 * bud) * (1 - 0.1 * open);
  let g = '';
  // Calyx (green, ridged cup behind the petals).
  const rx = calyxR * 1.05;
  const ry = calyxR * 1.45;
  const calyxCol = mix(style.calyx, '#8c7a3c', wilt * 0.6);
  g += `<path d="M0 ${f(ry * 0.9)}C${f(-rx * 1.3)} ${f(ry * 0.3)} ${f(-rx)} ${f(-ry)} 0 ${f(-ry)}C${f(rx)} ${f(-ry)} ${f(rx * 1.3)} ${f(ry * 0.3)} 0 ${f(ry * 0.9)}Z" fill="${calyxCol}" stroke="${darken(calyxCol, 0.35)}" stroke-width=".9"/>`;
  g += `<path d="M0 ${f(-ry)}V${f(ry * 0.85)}M${f(-rx * 0.5)} ${f(-ry * 0.85)}Q${f(-rx * 0.85)} 0 ${f(-rx * 0.35)} ${f(ry * 0.8)}M${f(rx * 0.5)} ${f(-ry * 0.85)}Q${f(rx * 0.85)} 0 ${f(rx * 0.35)} ${f(ry * 0.8)}" fill="none" stroke="${darken(calyxCol, 0.3)}" stroke-width=".7" opacity=".6"/>`;
  // A peek of colour at the top of the bud.
  if (open <= 0.04) {
    const peek = ramp(0.55, 1, st.bud);
    if (peek > 0) {
      g += `<ellipse cx="0" cy="${f(-ry * 0.95)}" rx="${f(rx * 0.55 * peek + 0.4)}" ry="${f(ry * 0.35 * peek + 0.4)}" fill="${pal.petal}" stroke="${darken(pal.petalDeep, 0.2)}" stroke-width=".6"/>`;
    }
  }
  const k = smooth(0.02, 1, st.open);
  if (k > 0.03) {
    const petalFade = 1 - smooth(0.25, 0.95, wilt);
    const dryCol = '#8a6a34';
    for (let j = 0; j < style.layers; j++) {
      const u = style.layers === 1 ? 0 : j / (style.layers - 1);
      // Inner layers open slightly later.
      const reveal = smooth(u * 0.55, u * 0.55 + 0.35, k);
      if (reveal < 0.03) continue;
      const count = Math.max(5, Math.round(style.outerCount + (style.innerCount - style.outerCount) * u));
      const len = R * (style.outerLen + (style.innerLen - style.outerLen) * u) * reveal * (0.45 + 0.55 * petalFade);
      const wid = R * (style.outerWid + (style.innerWid - style.outerWid) * u) * (0.6 + 0.4 * reveal);
      const baseR = R * (0.34 - 0.3 * u) * reveal;
      const col = mix(mix(pal.petalDeep, pal.petal, u * 0.8 + 0.1), pal.petalTip ?? lighten(pal.petal, 0.3), u * 0.55);
      const fill = mix(col, dryCol, smooth(0.05, 0.9, wilt));
      let d = '';
      const off = (j % 2) * (180 / count);
      for (let i = 0; i < count; i++) {
        if (wilt > 0.3 && smooth(0.3, 1, wilt) > 1 - ((i * 7 + j * 3) % count) / count * 0.95) continue;
        const a = (i / count) * 360 + off + Math.sin(i * 12.9898 + j * 4.1) * style.jitter;
        d += petalAt(0, 0, a, baseR, len, wid, style.tip, style.belly);
      }
      g += `<path d="${d}" fill="${fill}" stroke="${darken(fill, 0.32)}" stroke-width=".7" stroke-opacity=".55" stroke-linejoin="round"/>`;
    }
    // Seed head left behind after the petals fall.
    if (st.fruit > 0.05) {
      const m = smooth(0.05, 1, st.fruit);
      let d = '';
      const n = 26;
      for (let i = 0; i < n; i++) d += petalAt(0, 0, (i / n) * 360, R * 0.1, R * 0.34 * m, R * 0.06, 0.8, 0.4);
      g += `<path d="${d}" fill="${mix('#3b2c1e', '#6a5030', 0.3)}" stroke="#1d140c" stroke-width=".5"/>`;
      g += `<circle r="${f(R * 0.12 * m)}" fill="#c4b79b"/>`;
    }
  }
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}
