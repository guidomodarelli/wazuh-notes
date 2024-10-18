import { z, defineCollection } from 'astro:content';

const faqsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    title: z.string(),
    description: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    version: z.string(),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  faqs: faqsCollection,
};
