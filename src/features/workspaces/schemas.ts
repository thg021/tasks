import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'), 
  image: z.union([
    z.instanceof(File),
    z.string().transform(value => value === '' ? undefined : value)
  ]).optional()
});

export type CreateWorkspaceSchemaProps = z.infer<typeof createWorkspaceSchema>;

export const updateWorkspaceSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório').optional(), 
  image: z.union([
    z.instanceof(File),
    z.string().transform(value => value === '' ? undefined : value)
  ]).optional()
});

export type UpdateWorkspaceSchemaProps = z.infer<typeof updateWorkspaceSchema>;


