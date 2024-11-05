import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { DEFAULT_THEME } from './constants';

// https://astro.build/config
export default defineConfig({
  vite: {
    // https://stackoverflow.com/a/79003101
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or "modern"
        },
      },
    },
  },
  markdown: {
    shikiConfig: {
      // See note below for using dual light/dark themes
      theme: DEFAULT_THEME,
    },
  },
  integrations: [tailwind()],
});
