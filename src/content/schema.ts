import { z } from 'astro/zod';

const CONTENT_SCHEMA_FIELDS = {
  DATE: z.string({
    message: 'Date is required',
  }),
  TITLE: z.string({
    message: 'Title is required',
  }),
  DESCRIPTION: z.string({
    message: 'Description is required',
  }),
  AUTHOR: z.string({
    message: 'Author is required',
  }),
  TAGS: z
    .array(z.string(), {
      message: 'Tags are required',
    })
    .optional(),
  LINK: (name: string) =>
    z
      .string({
        message: `${name} is required`,
      })
      .url({
        message: `${name} is not a valid URL`,
      }),
} as const;

const schemaBase = z.object({
  date: CONTENT_SCHEMA_FIELDS.DATE,
  title: CONTENT_SCHEMA_FIELDS.TITLE,
  description: CONTENT_SCHEMA_FIELDS.DESCRIPTION,
  author: CONTENT_SCHEMA_FIELDS.AUTHOR,
  tags: CONTENT_SCHEMA_FIELDS.TAGS,
});

export const schemaFaq = schemaBase;

export const schemaApp = schemaBase.merge(
  z.object({
    doclink: CONTENT_SCHEMA_FIELDS.LINK('Doclink'),
  }),
);

export const schemaVagrant = schemaBase.merge(
  z.object({
    link: CONTENT_SCHEMA_FIELDS.LINK('Link'),
  }),
);
