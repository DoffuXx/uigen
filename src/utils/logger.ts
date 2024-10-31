import chalk from 'chalk';

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
};
