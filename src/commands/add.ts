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
import { execSync } from 'child_process';
import chalk from 'chalk';

const addOptionsSchema = z.object({
  component: z.string().optional(),
  library: z.string().optional(),
  outDir: z.string().optional(),
  packageManager: z.enum(['npm', 'yarn', 'pnpm']).optional(),
});

async function selectPackageManager(): Promise<string> {
  const { packageManager } = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'Select your package manager 📦',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' },
      ],
    },
  ]);
  return packageManager;
}

async function installDependencies(
  dependencies: string[],
  packageManager: string,
  isDev: boolean = false
) {
  if (dependencies.length === 0) {
    return;
  }

  const installCommand = {
    npm: `npm install ${isDev ? '-D' : ''}`,
    yarn: `yarn add ${isDev ? '-D' : ''}`,
    pnpm: `pnpm add ${isDev ? '-D' : ''}`,
  }[packageManager];

  const { confirmed } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirmed',
    message: `Would you like to install the following ${isDev ? 'dev dependencies' : 'dependencies'}?\n  ${chalk.cyan(dependencies.join(', '))}`,
    default: true,
  });

  if (!confirmed) {
    logger.info('Skipping dependency installation');
    return false;
  }

  try {
    const spinner = logger.spinner({
      text: 'Installing dependencies... 📦',
      color: 'yellow',
      spinner: 'sand',
    });
    spinner.start();

    execSync(`${installCommand} ${dependencies.join(' ')}`, {
      stdio: 'inherit',
    });
    spinner.stop();
    logger.success(`Dependencies installed successfully! ✨`);
  } catch (error) {
    logger.error('Failed to install dependencies 🙇', error);
    throw error;
  }
}

function displayTailwindInstructions(componentData: ComponentTypes) {
  if (componentData.tailwindconfig) {
    logger.info('\n📝 Tailwind Configuration Required:');
    console.log(chalk.yellow('\nAdd this to your tailwind.config.js:'));
    console.log(chalk.cyan(componentData.tailwindconfig));

    if (componentData.libutils) {
      console.log(
        chalk.yellow(
          '\nMake sure you have the utils.ts file in your lib folder:'
        )
      );
      console.log(
        chalk.cyan(`
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
      `)
      );
    }
  }
}

function displayComponentInfo(componentData: ComponentTypes) {
  logger.info('\n🎨 Component Information:');
  console.log(chalk.cyan(`Name: ${componentData.name}`));
  console.log(chalk.cyan(`Description: ${componentData.description}`));
  console.log(chalk.cyan(`Type: ${componentData.type}`));
  console.log(chalk.cyan(`Last Updated: ${componentData.updatedAt}`));
}

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
      message: 'Select a component 🎨',
      choices: registry[library].components.map(comp => ({
        name: `${comp.name} - ${comp.description} - last update : ${comp.updatedAt}`,
        value: comp.type,
      })),
    },
  ]);

  return component;
}

async function processComponentFiles(files: File[], options: any) {
  // TODO: Implement for every Project Type (React, Next js)
  const outDir = options.outDir || './src/components/ui/';
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
    .option(
      '-p, --packageManager <packageManager>',
      'Package manager to use (npm, yarn, or pnpm)'
    )
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

        const packageManager =
          options.packageManager || (await selectPackageManager());

        const componentData = registry[librarySelect].components.find(
          comp => comp.type === componentSelect.toLowerCase()
        );

        if (!componentData) {
          logger.error('Component not found 🙇');
          return;
        }
        const parsedResult = ValidateComponent(componentData);
        const componentDatas = parsedResult.data as ComponentTypes;

        displayComponentInfo(componentDatas);

        await processComponentFiles(componentDatas.files, options);

        if (componentDatas.dependencies?.length) {
          await installDependencies(
            componentDatas.dependencies,
            packageManager
          );
        }

        if (componentDatas.devDependencies?.length) {
          await installDependencies(
            componentDatas.devDependencies,
            packageManager,
            true
          );
        }

        displayTailwindInstructions(componentDatas);

        logger.success('\n✨ Component added successfully!');

        console.log(chalk.yellow('\n📚 Usage Example:'));
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
