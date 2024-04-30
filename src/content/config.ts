import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const reviewCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    fileName: z.string(),
    actor: z.array(z.string()),
    genres: z.array(z.string()),
    releaseYear: z.number(),
    director: z.string(),
    screenplay: z.string(),
    plot: z.string(),
  }),
});

const miscCollection = defineCollection({ type: 'content' });

export const collections = {
  review: reviewCollection,
  misc: miscCollection,
};
