/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import fs from 'fs-extra';
import path from 'path';
import { z } from 'zod';

import { FilePathSchema } from '../types/schema';
import { File } from '../types';

export async function writeComponentFile(
  file: File,
  basePath: string
): Promise<boolean> {
  try {
    const filePath = FilePathSchema.parse(path.join(basePath, file.filename));
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, file.content.trim());
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw error;
  }
}
