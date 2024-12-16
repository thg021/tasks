import type { InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

type UseGetTasksProps = {
  workspaceId: string;
  projectId?: string;
  status?: string;
  assignedId?: string;
  dueDate?: string;
  search?: string;
};

type TasksResponse = InferResponseType<(typeof client.api.task)['$get'], 200>;

export const useGetTasks = ({
  workspaceId,
  projectId,
  status,
  assignedId,
  dueDate,
  search
}: UseGetTasksProps) => {
  return useQuery({
    queryKey: ['tasks', workspaceId, projectId, status, assignedId, dueDate, search],
    queryFn: async (): Promise<TasksResponse> => {
      const response = await client.api.task['$get']({
        query: { workspaceId, projectId, status, assignedId, dueDate, search }
      });

      if (!response.ok) {
        return {
          data: []
        };
      }

      const data = await response.json();
      return data;
    }
  });
};
