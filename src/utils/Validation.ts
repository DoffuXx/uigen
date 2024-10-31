import { ComponentSchema, RegistrySchema } from '../types';

export function ValidateComponent(
  data: unknown
): ReturnType<typeof ComponentSchema.safeParse> {
  return ComponentSchema.safeParse(data);
}

export function ValidateLibrary(
  data: unknown
): ReturnType<typeof RegistrySchema.safeParse> {
  return RegistrySchema.safeParse(data);
}
