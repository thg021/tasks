import { Hono } from 'hono';
import { z } from 'zod';
import { createProjectSchema } from '@/features/projects/schemas';
import { createProject } from '@/features/projects/services/create-project';
import { getProjects } from '@/features/projects/services/get-projects';
import { getWorkspaceById } from '@/features/workspaces/services';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';

const app = new Hono()
.get('/', sessionMiddleware, zValidator('query', z.object({ workspaceId: z.string() })) ,async (c) => {
  const user = c.get('user');
  const { workspaceId } = c.req.valid('query');
  if (user.role !== 'ADMIN') {
    return c.json({
      error: 'Não autorizado: Você não tem permissão para listar os usuários'
    }, 401);
  }

  const projects = await getProjects({ workspaceId });
  return c.json({
    data: projects
  });
})
.post('/', zValidator('form', createProjectSchema), sessionMiddleware, async (c) => {
  const user = c.get('user');
  const { name, workspaceId } = c.req.valid('form');

  if(user.role !== 'ADMIN') {
    return c.json({
      error: 'Não autorizado: Você não tem permissão para criar um projeto'
    }, 401);
  }

  if (!workspaceId) {
    return c.json({
      error: 'Não autorizado: WorkspaceId inválido'
    }, 409);
  }

  const isExistingWorkspace = await getWorkspaceById({ userId: user.id, workspaceId });

  if (!isExistingWorkspace) {
    return c.json({
      error: 'Não autorizado: WorkspaceId inválido'
    }, 409);
  }

  const project = await createProject({ name, workspaceId });
  
  return c.json({
    data: project
 
  });
});

export default app;