import { z } from 'astro/zod';

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
});

export const schemaApp = z.object({
  date: z.string({
    message: 'Date is required',
  }),
  appname: z.string({
    message: 'Appname is required',
  }),
  description: z.string({
    message: 'Description is required',
  }),
  author: z.string({
    message: 'Author is required',
  }),
  doclink: z
    .string({
      message: 'Doclink is required',
    })
    .url({
      message: 'Doclink is not a valid URL',
    }),
});

export const schemaVagrant = z.object({
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
  link: z
    .string({
      message: 'Link is required',
    })
    .url({
      message: 'Link is not a valid URL',
    }),
  tags: z.array(z.string(), {
    message: 'Tags are required',
  }),
});
