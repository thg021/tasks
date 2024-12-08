import { z } from 'zod';
import { TaskStatus } from './types';

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, 'Obrigatório'),
  status: z.nativeEnum(TaskStatus, { required_error: 'Obrigatório' }),
  workspaceId: z.string().trim().min(1, 'Obrigatório'),
  projectId: z.string().trim().min(1, 'Obrigatório'),
  dueDate: z.coerce.date(),
  assignedId: z.string().trim().min(1, 'Obrigatório'),
  description: z.string().optional()
});

// Type inference
export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
