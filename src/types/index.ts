import { z } from 'zod';

enum ComponentType {
  Button = 'button',
  Input = 'input',
  Select = 'select',
  Textarea = 'textarea',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Switch = 'switch',
  Slider = 'slider',
  Progress = 'progress',
  Spinner = 'spinner',
  Avatar = 'avatar',
  Badge = 'badge',
  Breadcrumb = 'breadcrumb',
  Card = 'card',
  Carousel = 'carousel',
  Collapse = 'collapse',
  Dropdown = 'dropdown',
  Modal = 'modal',
  Pagination = 'pagination',
  Popover = 'popover',
  Sidebar = 'sidebar',
  Tabs = 'tabs',
  Tooltip = 'tooltip',
  Alert = 'alert',
  Toast = 'toast',
  Notification = 'notification',
  Accordion = 'accordion',
  Datepicker = 'datepicker',
  Timepicker = 'timepicker',
  Datetimepicker = 'datetimepicker',
  Calendar = 'calendar',
  Table = 'table',
  Tree = 'tree',
  Form = 'form',
  Menu = 'menu',
  Navbar = 'navbar',
}

export const FileSchema = z.object({
  filename: z.string(),
  content: z.string(),
});

export const ComponentSchema = z.object({
  description: z.string(),
  link: z.string(),
  name: z.string(),
  type: z.nativeEnum(ComponentType),
  updatedAt: z.string(),
  files: z.array(FileSchema),
  usage: z.string(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  libutils: z.boolean().optional(),
  tailwindconfig: z.string().optional(),
  // NOTE: Future work
  preview: z.string().optional(),
});

export const LibrarySchema = z.object({
  name: z.string(),
  description: z.string(),
  githubUrl: z.string(),
  components: z.array(ComponentSchema),
});

export const RegistrySchema = z.record(z.string(), LibrarySchema);

export type ComponentTypes = z.infer<typeof ComponentSchema>;

export type File = z.infer<typeof FileSchema>;

export type Component = z.infer<typeof ComponentSchema>;

export type Library = z.infer<typeof LibrarySchema>;

export type Registry = z.infer<typeof RegistrySchema>;
