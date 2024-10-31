/* eslint-disable no-useless-catch */
import { Config, ConfigSchema } from '../types/schema';
import path from 'path';

export function loadConfig(): Config {
  try {
    const configPath = path.join(process.cwd(), 'ui.config.json');
    const userconfig = require(configPath);
    return ConfigSchema.parse(userconfig);
  } catch (error) {
    throw error;
  }
}
