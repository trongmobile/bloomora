import {
  CX,
  GROUND_Y,
  clamp01,
  darken,
  dotsPath,
  f,
  leafAt,
  lighten,
  linearGradient,
  mix,
  mulberry32,
  radialGradient,
  ramp,
  smooth,
  type Ctx,
} from '../core';
import { SEED_Y, fallenPetals, roots } from '../scene';
import type { ArchetypeRenderer } from './types';

/** Scale of the above-ground tree: keeps the full canopy inside the 800×600 frame. */
const TREE_SCALE = 0.78;

interface Seg {
  parent: number;
  /** position on the parent (0..1) where this segment starts */
  at: number;
  x1: number;
  y1: number;
  /** final geometry (used for root-less segments) */
  x0: number;
  y0: number;
  level: number;
  bend: number;
  /** growth window in terms of s.stem */
  birth: number;
  dur: number;
}

const LEVEL_BIRTH = [0, 0.26, 0.42, 0.58, 0.72];
const LEVEL_DUR = [0.62, 0.36, 0.34, 0.3, 0.28];
const LEVEL_W = [1, 0.46, 0.27, 0.16, 0.1];

interface Tree {
  segs: Seg[];
  blossoms: { seg: number; t: number; dx: number; dy: number; sc: number; delay: number; rot: number }[];
}

let CACHE: Tree | null = null;

function buildTree(): Tree {
  if (CACHE) return CACHE;
  const rnd = mulberry32(2025);
  const segs: Seg[] = [];
  const rad = (d: number) => (d * Math.PI) / 180;
  const grow = (parent: number, at: number, x: number, y: number, angDeg: number, len: number, level: number) => {
    const x1 = x + Math.cos(rad(angDeg)) * len;
    const y1 = y + Math.sin(rad(angDeg)) * len;
    const idx = segs.length;
    segs.push({
      parent,
      at,
      x0: x,
      y0: y,
      x1,
      y1,
      level,
      bend: (rnd() - 0.5) * len * 0.28,
      birth: LEVEL_BIRTH[level]! + rnd() * 0.04,
      dur: LEVEL_DUR[level]!,
    });
    if (level >= 4) return;
    const n = level === 0 ? 4 : level === 3 ? 2 : 2 + (rnd() < 0.35 ? 1 : 0);
    for (let i = 0; i < n; i++) {
      const t = level === 0 ? 0.5 + i * 0.17 : 0.55 + (i / Math.max(1, n - 1)) * 0.45;
      const px = x + (x1 - x) * t;
      const py = y + (y1 - y) * t;
      const side = i % 2 === 0 ? -1 : 1;
      const spread = level === 0 ? 30 : 26;
      const a = angDeg + side * (spread * (0.7 + rnd() * 0.5)) + (rnd() - 0.5) * 14;
      const clampA = Math.max(-170, Math.min(-10, a));
      grow(idx, t, px, py, clampA, len * (level === 0 ? 0.74 : 0.74 + rnd() * 0.1), level + 1);
    }
  };
  grow(-1, 0, CX, GROUND_Y, -90, 182, 0);
  const blossoms: Tree['blossoms'] = [];
  segs.forEach((sg, i) => {
    if (sg.level < 2) return;
    const count = sg.level >= 3 ? 7 : 3;
    for (let k = 0; k < count; k++) {
      blossoms.push({
        seg: i,
        t: 0.25 + (k / count) * 0.75,
        dx: (rnd() - 0.5) * 14,
        dy: (rnd() - 0.5) * 14,
        sc: 0.8 + rnd() * 0.45,
        delay: rnd(),
        rot: rnd() * 72,
      });
    }
  });
  CACHE = { segs, blossoms };
  return CACHE;
}

interface Placed {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  cx: number;
  cy: number;
  k: number;
}

function place(c: Ctx, tree: Tree): Placed[] {
  const sway = c.sway * 3;
  const placed: Placed[] = [];
  tree.segs.forEach((sg, i) => {
    void i;
    const k = smooth(sg.birth, sg.birth + sg.dur, c.s.stem);
    let x0: number;
    let y0: number;
    if (sg.parent >= 0) {
      const p = placed[sg.parent]!;
      x0 = p.x0 + (p.x1 - p.x0) * sg.at;
      y0 = p.y0 + (p.y1 - p.y0) * sg.at;
      // follow the parent's curvature
      const q = sg.at;
      x0 += 2 * q * (1 - q) * (p.cx - (p.x0 + p.x1) / 2) * 2;
      y0 += 2 * q * (1 - q) * (p.cy - (p.y0 + p.y1) / 2) * 2;
    } else {
      x0 = sg.x0;
      y0 = sg.y0;
    }
    const sx = sway * (sg.level / 4);
    const x1 = x0 + (sg.x1 - sg.x0) * k + sx;
    const y1 = y0 + (sg.y1 - sg.y0) * k;
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy) || 1;
    placed.push({ x0, y0, x1, y1, cx: mx - (dy / len) * sg.bend * k, cy: my + (dx / len) * sg.bend * k, k });
  });
  return placed;
}

function blossomDefs(c: Ctx): string {
  const p = c.pal;
  let petals = '';
  for (let i = 0; i < 5; i++) {
    petals += `<path transform="rotate(${i * 72})" d="M0 0C-8 -3 -11 -12 -5 -15.5L0 -12.2L5 -15.5C11 -12 8 -3 0 0Z" fill="${c.url('sakuraPetal')}" stroke="${p.petalDeep}" stroke-width=".5" stroke-opacity=".5"/>`;
  }
  let st = '';
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    st += `M0 0L${f(Math.cos(a) * 4.2)} ${f(Math.sin(a) * 4.2)}`;
  }
  return `<g id="${c.id('blossom')}">${petals}<path d="${st}" stroke="${p.centerDeep}" stroke-width=".7" fill="none"/><circle r="1.5" fill="${p.center}"/></g>`;
}

export const sakura: ArchetypeRenderer = {
  defs(c) {
    const p = c.pal;
    return (
      radialGradient(c.id('sakuraPetal'), [[0, p.center], [0.28, p.petalDeep], [1, p.petal]], 0.5, 0.88, 0.95, 0.5, 0.95) +
      linearGradient(c.id('leafDry'), [[0, '#7a6a30'], [1, '#c2b46a']], 0, 0, 1, 0) +
      blossomDefs(c)
    );
  },
  plant(c) {
    const { s, pal } = c;
    let under = roots(c, { depth: 90, spread: 170, laterals: 8 });
    // The seed: a small stone from the cherry fruit.
    if (s.seed > 0.02) {
      under += `<g transform="translate(${CX} ${SEED_Y + 6}) rotate(-20)" opacity="${f(clamp01(s.seed))}" aria-hidden="true"><ellipse rx="12" ry="15" fill="#b98d5e" stroke="#6a4a2a" stroke-width="1.3"/><path d="M0 -13V13" stroke="#8a6238" stroke-width="1.4" opacity=".7"/></g>`;
    }
    if (s.stem < 0.01) return under;
    // The tree above ground is drawn at a reduced scale so a full canopy fits inside the frame.
    let out = '';
    const tree = buildTree();
    const placed = place(c, tree);
    const trunkW = 3 + 21 * Math.pow(smooth(0, 1, s.stem), 0.85);
    const bark = '#4d3b34';
    // Branches, thickest first.
    for (let level = 0; level <= 4; level++) {
      let d = '';
      tree.segs.forEach((sg, i) => {
        if (sg.level !== level) return;
        const pl = placed[i]!;
        if (pl.k < 0.01) return;
        d += `M${f(pl.x0)} ${f(pl.y0)}Q${f(pl.cx)} ${f(pl.cy)} ${f(pl.x1)} ${f(pl.y1)}`;
      });
      if (!d) continue;
      const w = Math.max(1.2, trunkW * LEVEL_W[level]!);
      out += `<path d="${d}" fill="none" stroke="${darken(bark, 0.25)}" stroke-width="${f(w + 1.6)}" stroke-linecap="round"/>`;
      out += `<path d="${d}" fill="none" stroke="${bark}" stroke-width="${f(w)}" stroke-linecap="round"/>`;
      if (level === 0) out += `<path d="${d}" fill="none" stroke="${lighten(bark, 0.3)}" stroke-width="${f(w * 0.2)}" stroke-linecap="round" opacity=".45" transform="translate(${f(-w * 0.2)} 0)"/>`;
    }
    // Leaves: young leaves while it is a sapling, none during bloom, new leaves after.
    const autumn = smooth(0.0, 0.3, s.bud);
    const leafVis = s.leaf * Math.max(1 - smooth(0.05, 0.55, s.bud), smooth(0.15, 0.7, s.wilt));
    if (leafVis > 0.04) {
      const leafCol = mix(mix(pal.leaf, '#e2a53c', autumn * (1 - smooth(0.15, 0.7, s.wilt))), '#9a8a4a', 0);
      let d = '';
      const rnd = mulberry32(31);
      tree.segs.forEach((sg, i) => {
        if (sg.level < 3) return;
        const pl = placed[i]!;
        if (pl.k < 0.5) return;
        for (let j = 0; j < 4; j++) {
          const t = 0.35 + j * 0.2;
          const lx = pl.x0 + (pl.x1 - pl.x0) * t;
          const ly = pl.y0 + (pl.y1 - pl.y0) * t;
          const ang = (rnd() < 0.5 ? -1 : 1) * (35 + rnd() * 40) - 90 + (rnd() - 0.5) * 40;
          const size = (0.55 + 0.45 * leafVis) * (0.8 + rnd() * 0.5);
          d += leafAt(lx, ly, ang, 24 * size * leafVis, 8.5 * size * leafVis, 0.08, 0.6, rnd() < 0.5 ? 1 : -1);
        }
      });
      out += `<path d="${d}" fill="${leafCol}" stroke="${darken(leafCol, 0.35)}" stroke-width=".6" stroke-linejoin="round" opacity=".96"/>`;
    }
    // Early leaves on a young shoot.
    const early = smooth(0.02, 0.22, s.leaf) * (1 - smooth(0.3, 0.6, s.stem));
    if (early > 0.03) {
      const pl = placed[0]!;
      let d = '';
      for (let j = 0; j < 5; j++) {
        const t = 0.45 + j * 0.13;
        const lx = pl.x0 + (pl.x1 - pl.x0) * t;
        const ly = pl.y0 + (pl.y1 - pl.y0) * t;
        d += leafAt(lx, ly, j % 2 ? -25 : 205, 36 * early, 14 * early, 0.12, 0.6, j % 2 ? 1 : -1);
      }
      out += `<path d="${d}" fill="${pal.leaf}" stroke="${darken(pal.leafDeep, 0.2)}" stroke-width=".8"/>`;
    }
    // Buds and blossoms.
    if (s.bud > 0.02 && s.stem > 0.9) {
      const budDots: { x: number; y: number; r: number }[] = [];
      let uses = '';
      const pos = (b: Tree['blossoms'][number]) => {
        const pl = placed[b.seg]!;
        const x = pl.x0 + (pl.x1 - pl.x0) * b.t + b.dx;
        const y = pl.y0 + (pl.y1 - pl.y0) * b.t + b.dy;
        return [x, y] as const;
      };
      tree.blossoms.forEach((b) => {
        const local = clamp01(s.open * 1.45 - b.delay * 0.45);
        const gone = s.wilt > 0.1 && smooth(0.1, 0.95, s.wilt) * 1.15 > b.delay * 0.9 + 0.05;
        if (gone) return;
        const [x, y] = pos(b);
        if (local < 0.18) {
          const r = (1.4 + 3.4 * ramp(0.1, 1, s.bud)) * b.sc;
          budDots.push({ x, y, r });
        } else {
          const sc = b.sc * (0.45 + 0.75 * local) * (1 - 0.25 * s.wilt);
          uses += `<use href="#${c.id('blossom')}" transform="translate(${f(x)} ${f(y)}) rotate(${f(b.rot)}) scale(${f(sc)})"/>`;
        }
      });
      if (budDots.length) {
        const budCol = mix(pal.petalDeep, '#c4456b', 0.3);
        out += `<path d="${dotsPath(budDots)}" fill="${budCol}" stroke="${darken(budCol, 0.3)}" stroke-width=".6"/>`;
      }
      out += uses;
      // Small cherries after the petals fall.
      if (s.fruit > 0.3) {
        const dots: { x: number; y: number; r: number }[] = [];
        tree.blossoms.forEach((b, i) => {
          if (i % 5 !== 0) return;
          const [x, y] = pos(b);
          dots.push({ x, y: y + 4, r: 2.4 * smooth(0.3, 1, s.fruit) });
        });
        out += `<path d="${dotsPath(dots)}" fill="#8a1f33" stroke="#4a0f1c" stroke-width=".6"/>`;
      }
    }
    if (s.wilt > 0.12) out += fallenPetals(c, smooth(0.12, 1, s.wilt) * 46, pal.petal, { spread: 230, size: 8, air: 0.55 });
    return `${under}<g transform="translate(${CX} ${GROUND_Y}) scale(${TREE_SCALE}) translate(${-CX} ${-GROUND_Y})">${out}</g>`;
  },
};
