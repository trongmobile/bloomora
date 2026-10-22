import { scoreQuiz, isStageId, resultQuery } from '../lib/quiz';
import { fmt } from '../i18n';

export interface QuizDeps {
  navigate: (url: string) => void;
}

/**
 * One question at a time. Without JavaScript every question stays visible (and a note explains
 * the quiz needs scripting), so this only ever hides what it can show again.
 */
export function initQuiz(root: ParentNode = document, deps: QuizDeps = { navigate: (url) => location.assign(url) }): void {
  const form = root.querySelector<HTMLFormElement>('[data-quiz]');
  if (!form) return;
  const steps = [...form.querySelectorAll<HTMLFieldSetElement>('[data-quiz-step]')];
  const nav = form.querySelector<HTMLElement>('[data-quiz-nav]');
  const back = form.querySelector<HTMLButtonElement>('[data-quiz-back]');
  const next = form.querySelector<HTMLButtonElement>('[data-quiz-next]');
  const count = form.querySelector<HTMLElement>('[data-quiz-count]');
  const progress = form.querySelector<HTMLProgressElement>('[data-quiz-progress]');
  if (steps.length === 0 || !nav || !back || !next) return;

  const total = steps.length;
  const countLabel = form.dataset.countLabel ?? '{n}/{total}';
  const chosen = (step: HTMLFieldSetElement | undefined): string | undefined =>
    step?.querySelector<HTMLInputElement>('input[type="radio"]:checked')?.value;
  let index = 0;

  const show = (focus: boolean): void => {
    steps.forEach((step, i) => {
      step.hidden = i !== index;
    });
    nav.hidden = false;
    back.hidden = index === 0;
    next.textContent = (index === total - 1 ? next.dataset.labelDone : next.dataset.labelNext) ?? next.textContent;
    next.disabled = !chosen(steps[index]);
    if (count) count.textContent = fmt(countLabel, { n: index + 1, total });
    if (progress) progress.value = index + 1;
    if (focus) steps[index]?.querySelector<HTMLElement>('legend')?.focus();
  };

  const finish = (): void => {
    const answers = steps.filter((s) => s.hasAttribute('data-scored')).map((s) => chosen(s));
    const stages = answers.filter(isStageId);
    const flower = chosen(steps.find((s) => s.hasAttribute('data-flower')));
    if (stages.length !== answers.length || stages.length === 0 || !flower) return;
    deps.navigate(`${form.dataset.resultBase ?? ''}${scoreQuiz(stages)}/${resultQuery(flower)}`);
  };

  form.addEventListener('change', () => {
    next.disabled = !chosen(steps[index]);
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!chosen(steps[index])) return;
    if (index < total - 1) {
      index += 1;
      show(true);
    } else {
      finish();
    }
  });
  back.addEventListener('click', () => {
    if (index === 0) return;
    index -= 1;
    show(true);
  });
  show(false);
  form.dataset.quizReady = 'true';
}
