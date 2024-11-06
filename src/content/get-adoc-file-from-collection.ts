import Processor, { type Document } from 'asciidoctor';
import { cwd } from 'node:process';
import { COLLECTION } from './constants';
import { load, type Cheerio, type CheerioAPI } from 'cheerio';
import { codeToHtml } from 'shiki';
import { DEFAULT_THEME } from '../../constants';
import type { Element } from 'domhandler';

const asciidoctor = Processor();

type ReturnType = Document & {
  convert: () => Promise<string>;
};

const transformCodeBlock = async (preElement: Cheerio<Element>) => {
  const codeElement = preElement.children('code');
  const codeLanguage = codeElement.attr('data-lang') || 'text';
  const highlightedHtml = await codeToHtml(codeElement.text(), {
    lang: codeLanguage,
    theme: DEFAULT_THEME,
  });
  preElement.replaceWith(highlightedHtml);
};

export function getAdocFileFromCollection(collection: COLLECTION, filename: string): ReturnType {
  const adocDocument = asciidoctor.loadFile(cwd() + `/src/content/${collection}/${filename}.adoc`);
  const $ = load(adocDocument.convert());

  // @ts-expect-error
  adocDocument.convert = async () => {
    const codeBlockElements = $('pre:has(> code)').get();

    for (const preElement of codeBlockElements) {
      await transformCodeBlock($(preElement));
    }

    return $.html();
  };

  // @ts-expect-error
  return adocDocument;
}
