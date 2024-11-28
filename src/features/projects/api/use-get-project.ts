import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

type UseGetProjectProps = { workspaceId: string; projectId: string };

export const useGetProject = ({ workspaceId, projectId }: UseGetProjectProps) => {
  return useQuery({
    queryKey: ['project', workspaceId, projectId],
    queryFn: async () => {
      const response = await client.api.projects['$get']({
        query: {
          workspaceId
        }
      });

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
