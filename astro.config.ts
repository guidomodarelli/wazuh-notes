// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import asciidoc from 'astro-asciidoc';
import path from 'node:path';
import { cwd } from 'node:process';
import type { default as shikiHighlighter } from './shiki-highlighter.js';
import { fileURLToPath } from 'node:url';

type ShikiOptions = Parameters<typeof shikiHighlighter>[0];
const DEFAULT_THEME = 'github-dark';

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
    asciidoc({
      options: {
        standalone: false,
        attributes: {
          stylesdir: path.join(cwd(), 'src/styles'),
          stylesheet: 'tailwind.css',
          'source-highlighter': 'shiki',
        },
      },
      highlighters: {
        shiki: {
          path: fileURLToPath(new URL('shiki-highlighter.js', import.meta.url)),
          options: {
            themes: [DEFAULT_THEME],
            langs: ['javascript', 'typescript', 'json', 'bash', 'sh', 'shell'],
          } satisfies ShikiOptions,
        },
      },
    }),
  ],
});
