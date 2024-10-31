import { ComponentSchema, ComponentTypes } from '../../../types';
import * as components from './index';

export const aceternityComponents: ComponentTypes[] = Object.values(components)
  .map(component => {
    const parsedResult = ComponentSchema.safeParse(component);
    if (!parsedResult.success) {
      console.error('Failed to parse component:', parsedResult.error);
      return null;
    }
    return parsedResult.data;
  })
  .filter((component): component is ComponentTypes => component !== null);
