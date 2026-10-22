import {
  cubicAt,
  cubicAngle,
  darken,
  f,
  leafAt,
  lighten,
  linearGradient,
  mix,
  petalAt,
  radialGradient,
  ramp,
  smooth,
  type Ctx,
  type Cubic,
} from '../core';
import { fallenPetals } from '../scene';
import { bushPlant, type LocalState } from './bush';
import type { ArchetypeRenderer } from './types';

interface P {
  ring: number;
  ang: number;
  len: number;
  wid: number;
}

const PETALS: P[] = [
  // outer ring
  ...[-100, -62, -24, 24, 62, 100].map((ang, i) => ({ ring: 0, ang, len: 60 - (i % 2) * 3, wid: 56 })),
  // middle ring
  ...[-66, -30, 6, 40, 70].map((ang) => ({ ring: 1, ang, len: 46, wid: 46 })),
  // inner ring
  ...[-34, 0, 32].map((ang) => ({ ring: 2, ang, len: 34, wid: 36 })),
];

function rose(c: Ctx, x: number, y: number, rot: number, scale: number, st: LocalState): string {
  const { pal } = c;
  const bud = smooth(0, 1, st.bud);
  if (bud < 0.03) return '';
  const open = smooth(0, 1, st.open);
  const wilt = smooth(0, 1, st.wilt);
  const size = (0.34 + 0.66 * Math.pow(bud, 0.8)) * scale;
  let g = '';
  const fruitK = smooth(0.1, 1, st.fruit);
  // Receptacle / hip.
  const hip = mix('#5f8a3a', '#d4472a', fruitK);
  const hr = 11 + 8 * fruitK;
  g += `<ellipse cx="0" cy="${f(10 * size)}" rx="${f(hr * size)}" ry="${f((hr + 3) * size)}" fill="${hip}" stroke="${darken(hip, 0.35)}" stroke-width="1"/>`;
  // Sepals.
  const sepalA = 18 + open * 105 + wilt * 20;
  for (const side of [-1, 0, 1]) {
    const a = side * sepalA * (side === 0 ? 0.2 : 1);
    g += `<path d="${petalAt(0, 4 * size, a, 0, 44 * size, 11 * size, 0.9, 0.3)}" fill="${mix(pal.leaf, '#8c7a3c', wilt * 0.6)}" stroke="${darken(pal.leafDeep, 0.2)}" stroke-width=".8"/>`;
  }
  const petalsLeft = 1 - smooth(0.25, 1, wilt);
  if (petalsLeft > 0.02) {
    const flare = 0.1 + 0.9 * open;
    const rings = [0, 1, 2];
    for (const ring of rings) {
      const list = PETALS.filter((p) => p.ring === ring);
      list.forEach((p, i) => {
        // petals drop from the outside in as the flower wilts
        const gone = wilt > 0.25 && smooth(0.25, 1, wilt) * 1.25 > (1 - ring * 0.28) * (0.3 + 0.7 * ((i + 1) / list.length)) && ring < 3;
        if (gone) return;
        const lenK = 0.62 + 0.38 * bud;
        const a = p.ang * flare * (1 + wilt * 0.35);
        const len = p.len * size * lenK * (0.86 + 0.14 * open) * (1 - 0.22 * wilt);
        const wid = p.wid * size * (0.85 + 0.15 * open);
        const fill = wilt > 0.05 ? mix(ring === 0 ? pal.petal : pal.petalDeep, '#7a4638', wilt * 0.8) : c.url(`rosePetal${ring}`);
        g += `<path d="${petalAt(0, 4 * size, a, 0, len, wid, 0.02, 0.62)}" fill="${fill}" stroke="${darken(pal.petalDeep, 0.3)}" stroke-width=".9" stroke-linejoin="round"/>`;
      });
    }
    // spiral heart
    if (open > 0.35 && wilt < 0.5) {
      const r = 14 * size * open;
      g += `<path d="M${f(-r * 0.6)} ${f(-r * 0.3 - 18 * size)}Q${f(0)} ${f(-r * 1.4 - 18 * size)} ${f(r * 0.8)} ${f(-r * 0.4 - 18 * size)}Q${f(r * 0.4)} ${f(r * 0.3 - 18 * size)} ${f(-r * 0.3)} ${f(r * 0.1 - 18 * size)}Q${f(-r * 0.1)} ${f(-r * 0.6 - 18 * size)} ${f(r * 0.25)} ${f(-r * 0.5 - 18 * size)}" fill="none" stroke="${darken(pal.petalDeep, 0.45)}" stroke-width="1.3" stroke-linecap="round" opacity="${f(0.8 * (1 - wilt))}"/>`;
    }
  } else if (fruitK > 0.1) {
    // calyx remnants on the hip
    for (const a of [-40, 0, 40]) {
      g += `<path d="${petalAt(0, 0, a, 0, 16 * size * fruitK, 4 * size, 0.9, 0.3)}" fill="${mix(pal.leaf, '#6e5a2a', 0.6)}"/>`;
    }
  }
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})">${g}</g>`;
}

function roseLeaf(c: Ctx, x: number, y: number, angle: number, scale: number, dry: number): string {
  const L = 64 * scale;
  const a = (angle * Math.PI) / 180;
  const rx = (t: number) => x + Math.cos(a) * L * t;
  const ry = (t: number) => y + Math.sin(a) * L * t + L * 0.18 * t * t;
  const flip = Math.cos(a) < 0 ? -1 : 1;
  let d = '';
  const leaflet = (t: number, ang: number, len: number, wid: number) => {
    d += leafAt(rx(t), ry(t), ang, len * scale, wid * scale, 0.1, 0.7, flip);
  };
  const base = angle;
  leaflet(0.3, base - 58 * flip, 28, 13);
  leaflet(0.3, base + 58 * flip, 28, 13);
  leaflet(0.62, base - 52 * flip, 32, 15);
  leaflet(0.62, base + 52 * flip, 32, 15);
  leaflet(1, base + 10, 36, 17);
  const col = mix(c.pal.leaf, '#a08c45', dry * 0.7);
  return (
    `<path d="M${f(x)} ${f(y)}Q${f(rx(0.5))} ${f(ry(0.5))} ${f(rx(1))} ${f(ry(1))}" fill="none" stroke="${darken(col, 0.15)}" stroke-width="${f(1.8 * scale + 0.5)}" stroke-linecap="round"/>` +
    `<path d="${d}" fill="${dry > 0.05 ? mix(c.pal.leaf, '#a08c45', dry * 0.8) : c.url('leaf')}" stroke="${darken(col, 0.4)}" stroke-width=".8" stroke-linejoin="round"/>`
  );
}

function thorns(c: Ctx, curve: Cubic, color: string): string {
  if (c.s.stem < 0.2) return '';
  let d = '';
  for (let i = 0; i < 9; i++) {
    const t = 0.12 + i * 0.09;
    if (t > 0.92) break;
    const [x, y] = cubicAt(curve, t);
    const side = i % 2 === 0 ? 1 : -1;
    const ang = cubicAngle(curve, t);
    void ang;
    const w = 6.5;
    d += `M${f(x + side * w * 0.3)} ${f(y + 3)}L${f(x + side * (w + 7))} ${f(y - 4)}L${f(x + side * w * 0.3)} ${f(y - 5)}Z`;
  }
  return `<path d="${d}" fill="${mix(color, '#7a3b2a', 0.55)}" stroke="${darken(color, 0.4)}" stroke-width=".5"/>`;
}

export const roseArchetype: ArchetypeRenderer = {
  defs(c) {
    const p = c.pal;
    const mk = (n: number, a: string, b: string) =>
      radialGradient(c.id(`rosePetal${n}`), [[0, a], [0.55, b], [1, p.petalTip ?? lighten(p.petal, 0.25)]], 0.5, 1, 0.9, 0.5, 1);
    return (
      linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0) +
      mk(0, p.petalDeep, p.petal) +
      mk(1, darken(p.petalDeep, 0.2), p.petalDeep) +
      mk(2, darken(p.petalDeep, 0.45), darken(p.petalDeep, 0.1)) +
      (ramp(0, 1, 1) ? '' : '')
    );
  },
  plant(c) {
    return bushPlant(c, {
      maxH: 300,
      stemW: 8,
      leavesPerStem: 8,
      leaf: { pairs: 3, length: 64, leafletLen: 30, leafletWid: 13, spread: 55 },
      leafFn: roseLeaf,
      decor: thorns,
      branches: [
        { at: 0.34, dx: -92, dy: -98, delay: 0.3, size: 0.66 },
        { at: 0.5, dx: 88, dy: -78, delay: 0.5, size: 0.54 },
      ],
      head: (cc, x, y, a, sc, st) => rose(cc, x, y, a, sc * 1.0, st),
    }) + (c.s.wilt > 0.3 ? fallenPetals(c, smooth(0.3, 1, c.s.wilt) * 11, c.pal.petal, { spread: 170, size: 15, air: 0.2 }) : '');
  },
};
