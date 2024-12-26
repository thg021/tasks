import { z } from 'zod';

export const createMemberSchema = z.object({
  name: z.string().trim().min(1, 'Obrigatório'),
  email: z.string().email({
    message: 'Email é obrigatório'
  }),
  projectsId: z.array(z.string()).optional()
});

export type CreateMemberSchemaProps = z.infer<typeof createMemberSchema>;
