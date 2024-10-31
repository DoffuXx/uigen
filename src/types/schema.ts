import { z } from 'zod';

const File = z.object({
  name: z.string(),
  content: z.string(),
});

export const ConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
  version: z.string(),
});

export const AddOptionsSchema = z.object({
  library: z.string().optional(),
  outDir: z.string().default('components/ui'),
});

export const FilePathSchema = z.string().min(1);

export type File = z.infer<typeof File>;

export type Config = z.infer<typeof ConfigSchema>;

export type AddOptions = z.infer<typeof AddOptionsSchema>;
