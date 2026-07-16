// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The live site has always used trailing-slash URLs (see docs/redirects.md).
// 'directory' format + 'always' keeps every preserved URL byte-identical.
export default defineConfig({
  site: 'https://thelifedoulaschool.co.uk',
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
