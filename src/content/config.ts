import { defineCollection } from 'astro:content';
import { schemaApp, schemaFaq, schemaVagrant } from "./schema";
import { COLLECTION } from "./constants";

const faqsCollection = defineCollection({
  type: 'content',
  schema: schemaFaq,
});

const appsCollection = defineCollection({
  type: 'content',
  schema: schemaApp,
});

const vagrantsCollection = defineCollection({
  type: 'content',
  schema: schemaVagrant,
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  [COLLECTION.FAQS]: faqsCollection,
  [COLLECTION.APPS]: appsCollection,
  [COLLECTION.VAGRANTS]: vagrantsCollection,
};
