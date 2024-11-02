// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import asciidoc from 'astro-asciidoc';
import path from 'node:path';
import { cwd } from 'node:process';

// https://astro.build/config
export default defineConfig({
  vite: {
    // https://stackoverflow.com/a/79003101
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    },
  },
  integrations: [tailwind(), asciidoc({
    options: {
      attributes: {
        stylesdir: path.join(cwd(), 'src/styles'),
        stylesheet: 'tailwind.css',
        'source-highlighter': 'highlight.js',
        'highlightjs-theme': 'atom-one-dark',
      },
    },
  })]
});