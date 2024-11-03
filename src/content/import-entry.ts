import { COLLECTION } from "./constants";

export function importFaqAdoc(faq: string) {
  return import(`../content/${COLLECTION.FAQS}/${faq}.adoc`);
}
