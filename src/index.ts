import { Command } from 'commander';
import { createAddCommand } from './commands/add';
import { logger } from './utils/logger';

const program = new Command()
  .name('mycli')
  .usage('<command> [options]')
  .description('A CLI for creating and managing UI components')
  .version('0.0.1');

program.addCommand(createAddCommand());

process.on('unhandledRejection', error => {
  logger.error('An error occurred:', error);
});

program.parse();
