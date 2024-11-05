import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import asciidoc from 'astro-asciidoc';
import { DEFAULT_THEME } from './constants';
import { ASCIIDOC_OPTIONS } from './asciidoc.config';

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
  integrations: [
    tailwind(),
    asciidoc(ASCIIDOC_OPTIONS),
  ],
});
