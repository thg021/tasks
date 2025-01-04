import { omit } from 'lodash';
import type { User } from '@/features/auth/types';
import { getTask } from '@/features/tasks/services/get-task';

type GetTaskByIdProps = {
  user: User;
  taskId: string;
  workspaceId: string;
};

export const getTaskById = async ({ user, taskId, workspaceId }: GetTaskByIdProps) => {
  try {
    if (!user) {
      throw new Error('Unauthorized: User not found');
    }

    if (!workspaceId) {
      return null;
    }

    if (!taskId) {
      return null;
    }

    const task = await getTask({
      id: taskId,
      workspaceId
    });

    if (!task) {
      return null;
    }

    return {
      ...omit(task, ['workspace'])
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error to get task by id');
  }
};
