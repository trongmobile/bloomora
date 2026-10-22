/** Embed snippet for a species page. Pure, so the page and the copy button build the same code. */

export type EmbedTheme = 'auto' | 'light' | 'dark';

/** Measured with the compact player at 760 px wide (about 1100 px); narrow phones need a little more. */
export const EMBED_HEIGHT = 1150;

const esc = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export interface EmbedInput {
  /** Absolute URL of the embed page, e.g. https://host/vi/embed/hoa-sen/ */
  embedUrl: string;
  /** Absolute URL of the species page, used for the visible credit link. */
  flowerUrl: string;
  /** Accessible title of the frame. */
  title: string;
  /** Link text for the credit under the frame. */
  credit: string;
  theme?: EmbedTheme;
  height?: number;
}

export function embedSrc(embedUrl: string, theme: EmbedTheme = 'auto'): string {
  return theme === 'auto' ? embedUrl : `${embedUrl}?theme=${theme}`;
}

export function embedSnippet(input: EmbedInput): string {
  const src = embedSrc(input.embedUrl, input.theme);
  return [
    `<iframe src="${esc(src)}" title="${esc(input.title)}" width="100%" height="${input.height ?? EMBED_HEIGHT}"`,
    `  style="border:0;border-radius:16px;max-width:760px" loading="lazy" allow="fullscreen" allowfullscreen></iframe>`,
    `<p style="font-size:14px;margin:4px 0 0"><a href="${esc(input.flowerUrl)}">${esc(input.credit)}</a></p>`,
  ].join('\n');
}
