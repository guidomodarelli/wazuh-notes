import Processor, { type Document } from 'asciidoctor';
import { cwd } from 'node:process';
import { ASCIIDOC_OPTIONS } from '../../asciidoc.config';
import { COLLECTION } from './constants';
import * as cheerio from 'cheerio';
import { codeToHtml } from 'shiki';
import { DEFAULT_THEME } from "../../constants";

const asciidoctor = Processor();

type ReturnType = Document & {
  convert: () => Promise<string>;
}

export function getAdocFileFromCollection(collection: COLLECTION, filename: string): ReturnType {
  const adocDocument = asciidoctor.loadFile(
    cwd() + `/src/content/${collection}/${filename}.adoc`,
    ASCIIDOC_OPTIONS,
  );
  const $ = cheerio.load(adocDocument.convert());

  // @ts-expect-error
  adocDocument.convert = async () => {
    // get all code blocks
    const codeBlocks = $('pre > code');
    const blocks = codeBlocks.get();

    for (const block of blocks) {
      const codeBlock = $(block);
      // get the language of the code block
      const language = codeBlock.attr('data-lang');
      const html = await codeToHtml(codeBlock.text(), {
        lang: language ?? 'text',
        theme: DEFAULT_THEME,
      });
      codeBlock.replaceWith(html);
    }

    return $.html();
  };

  // @ts-expect-error
  return adocDocument;
}
