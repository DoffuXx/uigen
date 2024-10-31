import { z } from 'zod';

export const configSchema = z.object({
  outDir: z.string().default('components/ui'),
  typescript: z.boolean().default(true),
  prettier: z.boolean().default(true),
  tailwind: z.boolean().default(true),
});

export type config = z.infer<typeof configSchema>;
