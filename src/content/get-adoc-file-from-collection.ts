import Processor from 'asciidoctor';
import { cwd } from "node:process";
import { ASCIIDOC_OPTIONS } from "../../asciidoc.config";
import { COLLECTION } from './constants';

const asciidoctor = Processor();

export function getAdocFileFromCollection(collection: COLLECTION, filename: string) {
  return asciidoctor.loadFile(cwd() + `/src/content/${collection}/${filename}.adoc`, ASCIIDOC_OPTIONS);
}
