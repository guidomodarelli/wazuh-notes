import { COLLECTION } from "./constants";

export function getAdocFileFromCollection(collection: COLLECTION, faq: string) {
  return import(`../content/${collection}/${faq}.adoc`);
}
