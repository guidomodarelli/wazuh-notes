import path from 'node:path';
import { cwd } from 'node:process';

export const ASCIIDOC_OPTIONS = {
  standalone: false,
  attributes: {
    stylesdir: path.join(cwd(), 'src/styles'),
    stylesheet: 'tailwind.css',
    'source-highlighter': 'shiki',
  },
};
