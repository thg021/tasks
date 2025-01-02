import type { InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

type UseGetTasksProps = {
  workspaceId: string;
  projectId: string;
  taskId: string;
};

type TasksResponse =
  | InferResponseType<(typeof client.api.task)[':taskId']['$get'], 200>
  | { data: null };

export const useGetTask = ({ workspaceId, projectId, taskId }: UseGetTasksProps) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: async (): Promise<TasksResponse> => {
      const response = await client.api.task[':taskId']['$get']({
        query: { workspaceId, projectId },
        param: { taskId }
      });

      if (!response.ok) {
        return {
          data: null
        };
      }

      const data = await response.json();
      return data;
    }
  });
};
