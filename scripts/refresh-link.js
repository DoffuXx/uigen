import { execSync } from 'child_process';
import { rimraf } from 'rimraf';
import { join } from 'path';
import chalk from 'chalk';

async function refreshLink() {
  try {
    console.log(chalk.blue('🔄 Refreshing npm link...'));

    console.log(chalk.blue('📦 Unlinking package globally...'));
    try {
      execSync('npm unlink -g uigen', { stdio: 'inherit' });
    } catch (error) {
      throw new Error('Error unlinking package globally');
    }

    console.log(chalk.blue('🧹 Cleaning dist folder...'));
    await rimraf(join(process.cwd(), 'dist'));

    console.log(chalk.blue('🛠️  Rebuilding package...'));
    execSync('npm run build', { stdio: 'inherit' });

    console.log(chalk.blue('🔗 Linking package globally...'));
    execSync('npm link', { stdio: 'inherit' });

    console.log(chalk.green('✨ npm link has been refreshed successfully!'));
    console.log(chalk.blue("You can now use 'uigen' command globally."));
  } catch (error) {
    console.error(chalk.red('Error refreshing npm link:'), error);
    process.exit(1);
  }
}

refreshLink();
