import { STAGE_IDS, type FlowerVisual, type Lang, type StageId } from '../data/types';
import { renderFlowerInner } from '../lib/art';
import { quizStory } from '../lib/clip/story';
import { MOMENT_LOCAL } from '../lib/moment';
import { bioStateForStage } from '../lib/timelapse/keyframes';
import { pickFlowerId, resultQuery } from '../lib/quiz';
import { fmt } from '../i18n';
import { copyText } from './share';
import { showToast } from './toast';

interface FlowerEntry {
  id: string;
  name: string;
  slug: string;
  alt: string;
  visual: FlowerVisual;
}

interface Config {
  stage: StageId;
  stageIndex: number;
  total: number;
  url: string;
  brand: string;
  artBase: string;
  momentBase: string;
  lang: Lang;
  title: string;
  kicker: string;
  headline: string;
  detail: string;
  cardWith: string;
  watch: string;
  disclaimer: string;
  msgSaved: string;
  msgFailed: string;
  msgCopied: string;
  defaultFlower: string;
  flowers: FlowerEntry[];
}

/** Personalises a (static) result page: the visitor's flower, their link and their share card. */
export function initQuizResult(root: ParentNode = document): void {
  const box = root.querySelector<HTMLElement>('[data-quiz-result]');
  if (!box?.dataset.config) return;
  const cfg = JSON.parse(box.dataset.config) as Config;
  if (!STAGE_IDS.includes(cfg.stage)) return;

  const ids = cfg.flowers.map((f) => f.id);
  const flowerId = pickFlowerId(location.search, ids, cfg.defaultFlower);
  const flower = cfg.flowers.find((f) => f.id === flowerId) ?? cfg.flowers[0]!;
  const img = box.querySelector<HTMLImageElement>('[data-result-art]');
  const caption = box.querySelector<HTMLElement>('[data-result-caption]');
  const watch = box.querySelector<HTMLAnchorElement>('[data-watch-link]');
  const note = box.querySelector<HTMLElement>('[data-result-note]');

  if (flower.id !== cfg.defaultFlower) {
    if (img) {
      img.src = `${cfg.artBase}${flower.id}/${cfg.stage}.svg`;
      img.alt = flower.alt;
    }
  }
  if (caption) caption.textContent = fmt(cfg.cardWith, { name: flower.name });
  if (watch) {
    // The moment pages live next to the species pages: /<lang>/flowers/<slug>/moment/<stage>/
    watch.href = `${cfg.momentBase}${cfg.lang}/flowers/${flower.slug}/moment/${cfg.stage}/`;
    watch.textContent = fmt(cfg.watch, { name: flower.name });
  }

  const shareUrl = `${cfg.url}${resultQuery(flower.id)}`;
  box.querySelector('[data-share-result]')?.addEventListener('click', async () => {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: cfg.title, text: cfg.kicker, url: shareUrl });
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
      }
    }
    if (await copyText(shareUrl)) showToast(cfg.msgCopied);
  });

  const saveBtn = box.querySelector<HTMLButtonElement>('[data-save-card]');
  saveBtn?.addEventListener('click', async () => {
    saveBtn.disabled = true;
    if (note) note.textContent = '';
    try {
      const b = await import('../lib/clip/browser');
      await b.loadStoryFonts(`${cfg.title} ${cfg.kicker} ${cfg.headline} ${cfg.detail} ${cfg.disclaimer} ${flower.name} ${cfg.brand}`);
      const frame = b.layoutStory(
        quizStory({
          kicker: cfg.kicker,
          title: cfg.title,
          withFlower: fmt(cfg.cardWith, { name: flower.name }),
          headline: cfg.headline,
          detail: cfg.detail,
          artInner: renderFlowerInner(flower.visual, bioStateForStage(cfg.stage, MOMENT_LOCAL), { idPrefix: 'card' }),
          stageIndex: cfg.stageIndex,
          total: cfg.total,
          disclaimer: cfg.disclaimer,
          brandUrl: cfg.brand,
          tint: flower.visual.palette.petal,
        }),
      );
      const blob = await b.renderStill(frame);
      const file = new File([blob], `bloomora-${cfg.stage}-${flower.id}.png`, { type: 'image/png' });
      const result = await b.shareOrDownload(file, { title: cfg.title, text: cfg.kicker });
      if (note && result !== 'cancelled') note.textContent = cfg.msgSaved;
    } catch {
      if (note) note.textContent = cfg.msgFailed;
    } finally {
      saveBtn.disabled = false;
    }
  });
}
