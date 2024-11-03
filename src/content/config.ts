import { defineCollection } from 'astro:content';
import { schemaApp, schemaFaq } from "./schema";

const faqsCollection = defineCollection({
  type: 'content',
  schema: schemaFaq,
});

const appsCollection = defineCollection({
  type: 'content',
  schema: schemaApp,
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  faqs: faqsCollection,
  apps: appsCollection,
};
