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

export const createStatusProjectSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  color: z.string().optional()
});

export type CreateStatusSchemaProps = z.infer<typeof createStatusProjectSchema>;

export const reorderStatusProjectSchema = z.object({
  id: z.string(),
  position: z.number(),
  positionOriginal: z.number()
});

// Schema para um array desses objetos
export const reorderStatusProjectArraySchema = z.array(reorderStatusProjectSchema);
