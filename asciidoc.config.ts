import type { Options } from "astro-asciidoc";
import path from "node:path";
import { cwd } from "node:process";
import { fileURLToPath } from "node:url";
import type { ShikiOptions } from "./types";
import { DEFAULT_THEME } from "./constants";

export const ASCIIDOC_OPTIONS: Options = {
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
}