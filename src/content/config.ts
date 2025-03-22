import { defineCollection, z } from "astro:content";

// Define schemas for documentation and narrative content
const docsSchema = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        tags: z.array(z.string()).optional(),
        order: z.number().optional(),
    }),
});

const narrativeSchema = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        categories: z.array(z.string()).optional(),
        featured: z.boolean().optional(),
    }),
});

// Export the collections
export const collections = {
    docs: docsSchema,
    narrative: narrativeSchema,
};
