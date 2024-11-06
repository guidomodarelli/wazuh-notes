import Processor, { type Document } from 'asciidoctor';
import { cwd } from 'node:process';
import { ASCIIDOC_OPTIONS } from '../.config/asciidoc.config';
import { COLLECTION } from './constants';
import { load, type Cheerio, type CheerioAPI } from 'cheerio';
import { codeToHtml } from 'shiki';
import { DEFAULT_THEME } from '../../constants';
import { createCopyButton } from '../ui/utils/create-copy-button';
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
  preElement.replaceWith(highlightedHtml + createCopyButton(codeElement));
};

const addRelativeClassToContainingElements = ($: CheerioAPI) => {
  $('*:has(> pre > code)').addClass('relative');
};

export function getAdocFileFromCollection(collection: COLLECTION, filename: string): ReturnType {
  const adocDocument = asciidoctor.loadFile(
    cwd() + `/src/content/${collection}/${filename}.adoc`,
    ASCIIDOC_OPTIONS,
  );
  const $ = load(adocDocument.convert());

  // @ts-expect-error
  adocDocument.convert = async () => {
    const codeBlockElements = $('pre:has(> code)').get();

    for (const preElement of codeBlockElements) {
      await transformCodeBlock($(preElement));
    }

    addRelativeClassToContainingElements($);
    return $.html();
  };

  // @ts-expect-error
  return adocDocument;
}
