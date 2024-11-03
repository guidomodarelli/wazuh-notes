import { z } from "astro/zod";

export const schemaFaq = z.object({
  date: z.string({
    message: 'Date is required',
  }),
  title: z.string({
    message: 'Title is required',
  }),
  description: z.string({
    message: 'Description is required',
  }),
  author: z.string({
    message: 'Author is required',
  }),
  tags: z.array(z.string(), {
    message: 'Tags are required',
  }),
  version: z.string({
    message: 'Version is required',
  }),
})