import { Command } from 'commander';
import { createAddCommand } from './commands/add';
import { logger } from './utils/logger';
import { createListCommand } from './commands/list';

const program = new Command()
  .name('uigen')
  .usage('<command> [options]')
  .description('✨ A CLI for creating and managing UI components ✨')
  .version('0.0.1', '-v, --version', '📦 output the version number');

program.addCommand(createAddCommand());
program.addCommand(createListCommand());

process.on('unhandledRejection', error => {
  logger.error('❌ An error occurred:', error);
});

program.parse();
