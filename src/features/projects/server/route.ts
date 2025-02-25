import { Hono } from 'hono';
import { find } from 'lodash';
import { z } from 'zod';
import {
  createProjectSchema,
  createStatusProjectSchema,
  reorderStatusProjectArraySchema,
  updateProjectSchema
} from '@/features/projects/schemas';
import { createProject } from '@/features/projects/services/create-project';
import { getProjects } from '@/features/projects/services/get-projects';
import { getWorkspaceById } from '@/features/workspaces/services';
import { db } from '@/lib/db.prisma';
import { isWorkspaceAdmin } from '@/lib/is-workspace-admin';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { createStatusProject } from '../services/create-status-project';
import { deleteProject } from '../services/delete-project';
import { deleteStatusProject } from '../services/delete-status-project';
import { getProject } from '../services/get-project';
import { getStatusProject } from '../services/get-status';
import { getStatusProjectById } from '../services/get-status-project-by-id';
import { getStatusProjectPosition } from '../services/get-status-project-position';
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
  .get('/:projectId/status', sessionMiddleware, async (c) => {
    const { projectId } = c.req.param();

    const status = await getStatusProject({ projectId });
    return c.json({
      data: status
    });
  })
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
  .post(
    '/:projectId/status',
    zValidator('json', createStatusProjectSchema),
    sessionMiddleware,
    async (c) => {
      // const user = c.get('user');
      const { name, color } = c.req.valid('json');
      const { projectId } = c.req.param();

      if (!projectId) {
        return c.json(
          {
            error: 'Não autorizado: projectId inválido'
          },
          409
        );
      }

      const isExistingProject = await getProject({ projectId });
      if (!isExistingProject) {
        return c.json(
          {
            error: 'Não autorizado: projectId inválido'
          },
          409
        );
      }

      const positionStatusProject = await getStatusProjectPosition({ projectId });
      const newPosition = positionStatusProject ? positionStatusProject.position + 1000 : 1000;

      const status = await createStatusProject({ name, color, projectId, position: newPosition });

      return c.json({
        data: status
      });
    }
  )
  .put(
    '/:projectId/status/reorder',
    zValidator('json', reorderStatusProjectArraySchema),
    sessionMiddleware,
    async (c) => {
      // const user = c.get('user');
      const list = c.req.valid('json');
      const { projectId } = c.req.param();

      if (!projectId) {
        return c.json(
          {
            error: 'Não autorizado: projectId inválido'
          },
          409
        );
      }

      const isExistingProject = await getProject({ projectId });
      if (!isExistingProject) {
        return c.json(
          {
            error: 'Não autorizado: projectId inválido'
          },
          409
        );
      }

      const promises = [];

      for (const item of list) {
        if (item.position !== item.positionOriginal) {
          promises.push(
            db.status.update({
              where: { id: item.id },
              data: { position: item.position }
            })
          );
        }
      }
      await Promise.all(promises);

      return c.json({
        data: {
          projectId
        }
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
    // const user = c.get('user');
    const { projectId } = c.req.param();

    if (!projectId) {
      return c.json(
        {
          error: 'Não autorizado: projectId inválido'
        },
        401
      );
    }

    const project = await getProject({ projectId });

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
  })
  .delete('/:projectId/status/:statusId', sessionMiddleware, async (c) => {
    // const user = c.get('user');
    const { projectId, statusId } = c.req.param();

    if (!projectId) {
      return c.json(
        {
          error: 'Não autorizado: projectId inválido'
        },
        401
      );
    }

    const project = await getProject({ projectId });

    if (!project) {
      return c.json(
        {
          error: 'Não autorizado: Você não tem permissão para deletar o cadastro.'
        },
        401
      );
    }

    const status = await getStatusProjectById({ statusId });

    if (!status) {
      return c.json(
        {
          error: 'Não autorizado: Você não tem permissão para deletar o cadastro.'
        },
        401
      );
    }

    await deleteStatusProject({ statusId });

    return c.json({
      data: status
    });
  });

export default app;
