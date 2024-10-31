import { Command } from 'commander';
import { registry } from '../registry';

export const createListCommand = () => {
  const listCommand = new Command('list');
  listCommand.description('List all available components 📜');
  listCommand.action(async () => {
    console.log('📋 List of available components:');
    Object.entries(registry).forEach(([key, lib]) => {
      console.log(`📚 Library: ${lib.name}`);
      lib.components.forEach(comp => {
        console.log(
          `- ${comp.name} - ${comp.description} - Last Updated: ${comp.updatedAt}`
        );
      });
    });
  });
  return listCommand;
};
