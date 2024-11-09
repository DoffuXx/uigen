import chalk from 'chalk';
import ora from 'ora';
import type { Options, Ora } from 'ora';

export const logger = {
  info: (message: string) => {
    console.log(chalk.blue('i'), message);
  },
  success: (message: string) => {
    console.log(chalk.green('✔'), message);
  },
  error: (message: string, error?: any) => {
    console.log(chalk.red('✖'), message);
    if (error) {
      console.error(error);
    }
  },
  warn: (message: string) => {
    console.log(chalk.yellow('⚠'), message);
  },
  spinner: (options: string | Options): Ora => {
    return ora(options);
  },
};
