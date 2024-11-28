import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  workspaceId: z.string().optional()
});

export type CreateProjectSchemaProps = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  projectId: z.string().optional(),
  workspaceId: z.string().optional()
});

export type UpdateProjectSchemaProps = z.infer<typeof updateProjectSchema>;
