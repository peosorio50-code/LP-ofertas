import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/config';

export default defineConfig({
  site: SITE_URL,
  compressHTML: true,
  build: { inlineStylesheets: 'always' },
});
