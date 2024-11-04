import { COLLECTION } from "./constants";

export function importAdocFiles(collection: COLLECTION, faq: string) {
  return import(`../content/${collection}/${faq}.adoc`);
}
