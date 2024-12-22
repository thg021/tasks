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
import { deleteTask } from '../services/delete-task';
import { getTask } from '../services/get-task';
import { getTasks } from '../services/get-tasks';
import { updateTask } from '../services/update-task';
import { TaskStatus } from '../types';

const app = new Hono()
  .get(
    '/',
    sessionMiddleware,
    zValidator(
      'query',
      z.object({
        workspaceId: z.string(),
        projectId: z.string().optional(),
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

      if (!member || !find(member?.workspaces, (workspace) => workspace.id === workspaceId)) {
        return c.json(
          {
            error: 'Não autorizado: Você não é membro deste workspace'
          },
          401
        );
      }

      const tasks = await getTasks({
        workspaceId,
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
  .get(
    '/:taskId',
    zValidator(
      'query',
      z.object({
        workspaceId: z.string(),
        projectId: z.string()
      })
    ),
    sessionMiddleware,
    async (c) => {
      const user = c.get('user');
      const { workspaceId } = c.req.valid('query');
      const { taskId } = c.req.param();

      const member = await getMemberById({ userId: user.id });

      if (!member || !find(member?.workspaces, (workspace) => workspace.id === workspaceId)) {
        return c.json(
          {
            error: 'Não autorizado: Você não é membro deste workspace'
          },
          401
        );
      }

      const task = await getTask({ id: taskId, workspaceId });

      return c.json({
        data: task
      });
    }
  )
  .post('/', zValidator('json', createTaskSchema), sessionMiddleware, async (c) => {
    const user = c.get('user');
    const { workspaceId, projectId, status, assignedId, dueDate, name, description } =
      c.req.valid('json');

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
  })
  .patch(
    '/:taskId',
    zValidator('json', createTaskSchema.partial()),
    sessionMiddleware,
    async (c) => {
      const user = c.get('user');
      const { taskId } = c.req.param();
      const { workspaceId, projectId, status, assignedId, dueDate, name, description } =
        c.req.valid('json');

      if (!projectId || !workspaceId) {
        return c.json(
          {
            error: 'Não autorizado: WorkspaceId ou ProjectId inválido'
          },
          409
        );
      }

      const existingTask = await getTask({ id: taskId, workspaceId });

      if (!existingTask) {
        return c.json(
          {
            error: 'Tarefa não encontrada'
          },
          404
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

      const task = await updateTask({
        id: taskId,
        workspaceId,
        projectId,
        status,
        assignedId,
        dueDate,
        name,
        description
      });

      return c.json({
        data: task
      });
    }
  )
  .delete('/:workspaceId/:taskId', sessionMiddleware, async (c) => {
    const user = c.get('user');
    const { taskId, workspaceId } = c.req.param();

    const task = await getTask({ id: taskId, workspaceId });

    if (!task) {
      return c.json(
        {
          error: 'Não encontrado: Tarefa não encontrada'
        },
        404
      );
    }

    const member = await getMemberById({ userId: user.id });

    if (!member) {
      return c.json(
        {
          error: 'Não autorizado: Você não é membro deste projeto'
        },
        401
      );
    }

    const isMemberProject = find(
      member.workspaces,
      (workspace) => workspace.id === task.workspaceId
    );

    if (!isMemberProject) {
      return c.json(
        {
          error: 'Não autorizado: Você não é membro deste workspace'
        },
        401
      );
    }

    await deleteTask({ id: taskId, workspaceId });
    return c.json({
      data: task
    });
  });

export default app;
