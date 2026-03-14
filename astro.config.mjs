// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kavare.github.io',
  base: '/cttr',
  output: 'static',
  integrations: [react()],
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