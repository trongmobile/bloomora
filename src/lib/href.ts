import { withBase } from './url';

/** Root-relative href that respects the configured Astro base path. */
export const href = (path: string): string => withBase(import.meta.env.BASE_URL, path);
