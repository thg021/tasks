import { z } from 'zod';
import { TaskStatus } from './types';

export const createTaskSchema = z.object({
  url: z.string().trim().optional(),
  name: z.string().trim().min(1, 'Obrigatório'),
  status: z.nativeEnum(TaskStatus, { required_error: 'Obrigatório' }),
  workspaceId: z.string().trim().min(1, 'Obrigatório'),
  projectId: z.string().trim().min(1, 'Obrigatório'),
  dueDate: z.coerce.date(),
  assignedId: z.string().trim().min(1, 'Obrigatório'),
  description: z.string().optional()
});

// Type inference
export type CreateTaskSchemaProps = z.infer<typeof createTaskSchema>;

export const createInitialTaskSchema = z.object({
  url: z.string().trim().optional(),
  name: z.string().trim().min(1, 'Obrigatório'),
  status: z.string().trim().min(1, 'Obrigatório'),
  workspaceId: z
    .string()
    .trim()
    .optional()
    .transform((val) => val || undefined),
  projectId: z
    .string()
    .trim()
    .optional()
    .transform((val) => val || undefined)
});

// Type inference
export type CreateInitialTaskSchemaProps = z.infer<typeof createInitialTaskSchema>;

export const editTaskSchema = z.object({
  name: z.string().trim().min(1, 'Obrigatório'),
  id: z.string().trim().min(1, 'Obrigatório'),
  userStoryId: z
    .string()
    .trim()
    .nullable()
    .transform((val) => val || undefined),
  url: z
    .string()
    .trim()
    .nullable()
    .transform((val) => val || undefined),
  status: z
    .nativeEnum(TaskStatus)
    .nullable()
    .transform((val) => val || undefined),
  workspaceId: z
    .string()
    .trim()
    .nullable()
    .transform((val) => val || undefined),
  projectId: z
    .string()
    .trim()
    .nullable()
    .transform((val) => val || undefined),
  dueDate: z.coerce
    .string()
    .nullable()
    .transform((val) => {
      if (!val) return undefined;
      return new Date(val);
    }),
  assignedId: z
    .string()
    .trim()
    .nullable()
    .transform((val) => val || undefined),
  description: z
    .string()
    .nullable()
    .transform((val) => val || undefined)
});

// Type inference
export type EditTaskSchemaProps = z.infer<typeof editTaskSchema>;
