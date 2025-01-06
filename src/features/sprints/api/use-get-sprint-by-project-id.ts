import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

type UseGetSprintByProjectIdProps = {
  projectId: string;
};

export const useGetSprintByProjectId = ({ projectId }: UseGetSprintByProjectIdProps) => {
  return useQuery({
    queryKey: ['sprints', projectId],
    queryFn: async () => {
      const response = await client.api.sprints[':projectId']['$get']({
        param: {
          projectId
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
