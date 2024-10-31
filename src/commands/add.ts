import { Command } from 'commander';
import inquirer from 'inquirer';
import { z } from 'zod';
import { registry } from '../registry';
import { ValidateComponent } from '../utils/Validation';
import path from 'path';
import { writeComponentFile } from '../utils/fs';
import fs from 'fs-extra';
import { logger } from '../utils/logger';
import { File } from '../types';
import { ComponentTypes } from '../types';

const addOptionsSchema = z.object({
  component: z.string().optional(),
  library: z.string().optional(),
  outDir: z.string().optional(),
});

async function selectLibrary(): Promise<string> {
  const { library } = await inquirer.prompt([
    {
      type: 'list',
      name: 'library',
      message: 'Select a UI library 📚',
      choices: Object.entries(registry).map(([key, lib]) => ({
        name: `${lib.name} - ${lib.description} - Github Link : ${lib.githubUrl}`,
        value: key,
      })),
    },
  ]);
  return library;
}

async function selectComponent(library: string): Promise<string> {
  const { component } = await inquirer.prompt([
    {
      type: 'list',
      name: 'component',
      message: 'Select a Component 🧩',
      choices: registry[library].components.map((key, comp) => ({
        name: `${key.name} - ${key.description} - last update : ${key.updatedAt}`,
        value: key.type,
      })),
    },
  ]);
  return component;
}

async function processComponentFiles(files: File[], options: any) {
  // TODO: Implement for every Project Type (React, Next js)
  const outDir = options.outDir || './';
  const componentDir = path.join(process.cwd(), outDir);
  await fs.ensureDir(componentDir);
  for (const file of files) {
    await writeComponentFile(file, componentDir);
  }
}

export const createAddCommand = () => {
  const command = new Command('add')
    .description('Add a Component to the project 🚀')
    .option('-c, --component <component>', 'Component to add (optional)')
    .option('-l, --library <library>', 'UI library to use (optional)')
    .option('-o, --outDir <outDir>', 'Output directory (optional)')
    .action(async opts => {
      try {
        const options = addOptionsSchema.parse({
          component: opts.component,
          library: opts.library,
          outDir: opts.outDir,
        });

        const librarySelect = options.library || (await selectLibrary());
        const componentSelect =
          options.component || (await selectComponent(librarySelect));
        const componentData = registry[librarySelect].components.find(
          comp => comp.type === componentSelect.toLowerCase()
        );
        if (!componentData) {
          logger.error('Component not found 🙇');
          return;
        }
        const parsedResult = ValidateComponent(componentData);
        const componentDatas = parsedResult.data as ComponentTypes;
        await processComponentFiles(componentDatas.files, options);

        logger.info('Component added successfully 🎉');
      } catch (error) {
        if (error instanceof z.ZodError) {
          logger.error('Validation error:', error.errors);
        } else {
          logger.error('Failed to add component: 🙇', error);
        }
      }
    });
  return command;
};
