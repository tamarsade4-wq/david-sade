import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL: replace with the real domain once purchased
export default defineConfig({
  site: process.env.SITE_URL || 'https://davidsade.co.il',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !page.endsWith('/sketch') })],
});
