import Processor, { type Document } from 'asciidoctor';
import { cwd } from 'node:process';
import { ASCIIDOC_OPTIONS } from '../.config/asciidoc.config';
import { COLLECTION } from './constants';
import * as cheerio from 'cheerio';
import { codeToHtml } from 'shiki';
import { DEFAULT_THEME } from '../../constants';
import { createCopyButton } from "../ui/utils/create-copy-button";

const asciidoctor = Processor();

type ReturnType = Document & {
  convert: () => Promise<string>;
};

export function getAdocFileFromCollection(collection: COLLECTION, filename: string): ReturnType {
  const adocDocument = asciidoctor.loadFile(
    cwd() + `/src/content/${collection}/${filename}.adoc`,
    ASCIIDOC_OPTIONS,
  );
  const $ = cheerio.load(adocDocument.convert());

  // @ts-expect-error
  adocDocument.convert = async () => {
    // get all code blocks
    const codeBlocks = $('pre:has(> code)');
    const blocks = codeBlocks.get();

    for (const block of blocks) {
      // get the pre code block element
      const preCodeBlock = $(block);
      // get the code block element
      const codeBlock = preCodeBlock.children('code');
      // get the language of the code block
      const language = codeBlock.attr('data-lang');
      const html = await codeToHtml(codeBlock.text(), {
        lang: language ?? 'text',
        theme: DEFAULT_THEME,
      });
      preCodeBlock.replaceWith(html + createCopyButton(codeBlock));
    }

    // get wrapped code blocks
    const wrappedCodeBlocks = $('*:has(> pre > code)');
    wrappedCodeBlocks.addClass('relative');

    return $.html();
  };

  // @ts-expect-error
  return adocDocument;
}
