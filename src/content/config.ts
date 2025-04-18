import { defineCollection, z } from 'astro:content';

const landingCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    heading: z.string().optional(),
    description: z.string().optional(),
    cta: z.string().optional(),
    image: image().optional(),
    characters: z.array(
      z.object({
        name: z.string(),
        role: z.string(),
        bio: z.string(),
        image: z.string().optional(),
      })
    ).optional(),
  }),
});

export const collections = {
  'landing': landingCollection,
}; 