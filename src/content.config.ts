import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guide = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guide' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Legacy Starlight-era frontmatter — kept so existing files stay valid
    sidebar: z
      .object({
        order: z.number().optional(),
      })
      .optional(),
    // Optional new fields authors can add
    order: z.number().optional(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { guide };
