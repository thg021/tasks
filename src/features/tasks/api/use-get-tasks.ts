import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

type UseGetTasksProps = {
  workspaceId: string;
  projectId?: string;
};

export const useGetTasks = ({ workspaceId, projectId }: UseGetTasksProps) => {
  return useQuery({
    queryKey: ['tasks', workspaceId],
    queryFn: async () => {
      const response = await client.api.task['$get']({ query: { workspaceId, projectId } });

      if (!response.ok) {
        return {
          data: [],
          total: 0
        };
      }

      const data = await response.json();
      return data;
    }
  });
};
