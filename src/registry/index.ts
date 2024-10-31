import { Registry, RegistrySchema } from '../types';
import { aceternityComponents } from './aceternity/components/components';

export const registry: Registry = RegistrySchema.parse({
  aceternity: {
    name: 'AceTernity',
    description: 'AceTernity Design System',
    githubUrl: 'https://github.com/aceternity/aceternity',
    components: aceternityComponents,
  },
});
