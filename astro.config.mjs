// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://aarontthsieh.com',
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          'zh-tw': 'zh-TW',
          ja: 'ja',
          ko: 'ko',
        },
      },
      filter: (page) => {
        const url = new URL(page);
        // Exclude the root redirect page
        return url.pathname !== '/' && url.pathname !== '';
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-tw', 'ja', 'ko'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
