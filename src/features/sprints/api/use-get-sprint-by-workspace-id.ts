import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

type UseGetSprintByWorkspaceIdProps = {
  workspaceId: string;
};

export const useGetSprintByWorkspaceId = ({ workspaceId }: UseGetSprintByWorkspaceIdProps) => {
  return useQuery({
    queryKey: ['sprints', workspaceId],
    queryFn: async () => {
      const response = await client.api.sprints['workspace'][':workspaceId']['$get']({
        param: {
          workspaceId
        }
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
