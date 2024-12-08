import { Hono } from 'hono';
import { find } from 'lodash';
import { z } from 'zod';
import { getMemberById } from '@/features/members/services/get-member-by-id';
import { highestPositionTask } from '@/features/tasks/services/get-task-position';
import { getWorkspaceById } from '@/features/workspaces/services';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { createTaskSchema } from '../schemas';
import { createTask } from '../services/create-task';
import { getTasks } from '../services/get-tasks';
import { TaskStatus } from '../types';

const app = new Hono()
  .get(
    '/',
    sessionMiddleware,
    zValidator(
      'query',
      z.object({
        workspaceId: z.string(),
        projectId: z.string(),
        assignedId: z.string().optional(),
        status: z.nativeEnum(TaskStatus).optional(),
        search: z.string().optional(),
        dueDate: z.coerce.date().optional()
      })
    ),
    async (c) => {
      const user = c.get('user');
      const { workspaceId, projectId, assignedId, status, search, dueDate } = c.req.valid('query');

      const member = await getMemberById({ userId: user.id });

      if (!member || find(member?.workspaces, (workspace) => workspace.id === workspaceId)) {
        return c.json(
          {
            error: 'Não autorizado: Você não é membro deste workspace'
          },
          401
        );
      }

      const tasks = await getTasks({
        projectId,
        assignedId,
        status,
        search,
        dueDate
      });

      return c.json({
        data: tasks
      });
    }
  )
  .post('/', zValidator('form', createTaskSchema), sessionMiddleware, async (c) => {
    const user = c.get('user');
    const { workspaceId, projectId, status, assignedId, dueDate, name, description } =
      c.req.valid('form');

    const isExistingWorkspace = await getWorkspaceById({ userId: user.id, workspaceId });

    if (!isExistingWorkspace) {
      return c.json(
        {
          error: 'Não autorizado: WorkspaceId inválido'
        },
        409
      );
    }

    const positionTask = await highestPositionTask({ status, workspaceId });
    const newPosition = positionTask ? positionTask.position + 1000 : 1000;

    const task = await createTask({
      workspaceId,
      projectId,
      status,
      assignedId,
      dueDate,
      name,
      description,
      position: newPosition
    });

    return c.json({
      data: task
    });
  });

export default app;
