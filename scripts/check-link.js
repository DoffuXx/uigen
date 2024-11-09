import { execSync } from 'child_process';
import chalk from 'chalk';

function checkLink() {
  try {
    const globalPackages = execSync('npm ls -g --depth=0').toString();
    const isLinked = globalPackages.includes('uigen');

    if (isLinked) {
      console.log(chalk.green('✓ uigen is properly linked globally'));
      const version = execSync('uigen --version').toString().trim();
      console.log(chalk.blue(`Current version: ${version}`));
    } else {
      console.log(chalk.red('✖ uigen is not linked globally'));
      console.log(chalk.yellow('Run `npm run refresh-link` to fix this'));
    }
  } catch (error) {
    console.error(chalk.red('Error checking npm link:'), error);
    process.exit(1);
  }
}

checkLink();
