import { Hono } from 'hono';
import { find } from 'lodash';
import { z } from 'zod';
import { createProjectSchema, updateProjectSchema } from '@/features/projects/schemas';
import { createProject } from '@/features/projects/services/create-project';
import { getProjects } from '@/features/projects/services/get-projects';
import { getWorkspaceById } from '@/features/workspaces/services';
import { isWorkspaceAdmin } from '@/lib/is-workspace-admin';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { deleteProject } from '../services/delete-project';
import { getProject } from '../services/get-project';
import { updateProject } from '../services/update-project';

const app = new Hono()
  .get(
    '/',
    sessionMiddleware,
    isWorkspaceAdmin,
    zValidator('query', z.object({ workspaceId: z.string() })),
    async (c) => {
      const { workspaceId } = c.req.valid('query');

      const projects = await getProjects({ workspaceId });
      return c.json({
        data: projects
      });
    }
  )
  .get(
    '/:projectId',
    sessionMiddleware,
    isWorkspaceAdmin,
    zValidator('query', z.object({ workspaceId: z.string() })),
    async (c) => {
      const { workspaceId } = c.req.valid('query');

      const projects = await getProjects({ workspaceId });
      return c.json({
        data: projects
      });
    }
  )
  .post(
    '/:workspaceId',
    zValidator('form', createProjectSchema),
    sessionMiddleware,
    isWorkspaceAdmin,
    async (c) => {
      const user = c.get('user');
      const { name } = c.req.valid('form');
      const { workspaceId } = c.req.param();

      if (!workspaceId) {
        return c.json(
          {
            error: 'Não autorizado: WorkspaceId inválido'
          },
          409
        );
      }

      const isExistingWorkspace = await getWorkspaceById({ userId: user.id, workspaceId });

      if (!isExistingWorkspace) {
        return c.json(
          {
            error: 'Não autorizado: WorkspaceId inválido'
          },
          409
        );
      }

      const project = await createProject({ name, workspaceId, userId: user.id });

      return c.json({
        data: project
      });
    }
  )
  .patch('/', zValidator('form', updateProjectSchema), sessionMiddleware, async (c) => {
    const user = c.get('user');
    const { name, workspaceId, projectId } = c.req.valid('form');

    if (!workspaceId || !projectId) {
      return c.json(
        {
          error: 'Não autorizado: WorkspaceId ou ProjectId inválido'
        },
        409
      );
    }

    const isExistingWorkspace = await getWorkspaceById({ userId: user.id, workspaceId });

    if (!isExistingWorkspace) {
      return c.json(
        {
          error: 'Não autorizado: WorkspaceId inválido'
        },
        409
      );
    }

    const isExistingProject = find(
      isExistingWorkspace.projects,
      (project) => project.id === projectId
    );

    if (!isExistingProject) {
      return c.json(
        {
          error: 'Projeto não encontrado'
        },
        404
      );
    }

    const project = await updateProject({ name, workspaceId, projectId });

    return c.json({
      data: project
    });
  })
  .delete('/:projectId', sessionMiddleware, async (c) => {
    const user = c.get('user');
    const { projectId } = c.req.param();

    if (!projectId) {
      return c.json(
        {
          error: 'Não autorizado: projectId inválido'
        },
        401
      );
    }

    const project = await getProject({ userId: user.id, projectId });

    if (!project) {
      return c.json(
        {
          error: 'Não autorizado: Você não tem permissão para deletar o cadastro.'
        },
        401
      );
    }

    await deleteProject({ projectId });

    return c.json({
      data: projectId
    });
  });

export default app;
