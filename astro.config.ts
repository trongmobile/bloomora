import type { AstroIntegration } from 'astro';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { normalizeBase, normalizeSite } from './src/lib/url.ts';

/**
 * `SITE_URL` and `BASE_PATH` come from the environment so the same code builds for
 *  - a custom domain:        SITE_URL=https://flowers.example.com  BASE_PATH=/
 *  - a GitHub project site:  SITE_URL=https://<owner>.github.io    BASE_PATH=/<repo>/
 * See docs/DEPLOYMENT.md.
 */
const site = normalizeSite(process.env.SITE_URL);
const base = normalizeBase(process.env.BASE_PATH);

/**
 * Dev only: with `trailingSlash: 'always'` Astro's dev server only matches the dynamic
 * `/art/[id].svg` endpoint as `/art/<id>.svg/` (it doesn't see the file extension on a dynamic
 * route), so the posters 404 and cards show a broken image. The production build emits
 * `art/<id>.svg` as a plain file and is unaffected.
 */
const devArtPosterSlash: AstroIntegration = {
  name: 'dev-art-poster-slash',
  hooks: {
    'astro:server:setup': ({ server }) => {
      server.middlewares.use((req, _res, next) => {
        if (req.url) req.url = req.url.replace(/(\/art\/[^?#]+\.svg)(?=[?#]|$)/, '$1/');
        next();
      });
    },
  },
};

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [react(), devArtPosterSlash],
  devToolbar: { enabled: false },
  compressHTML: true,
});
