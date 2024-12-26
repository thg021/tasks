import { transformProjectsData } from '@/features/projects/utils/transform-projects-data';
import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

type GetProjectsProps = { workspaceId: string };

export const useGetProjects = ({ workspaceId }: GetProjectsProps) => {
  return useQuery({
    queryKey: ['projects', workspaceId],
    queryFn: async () => {
      const response = await client.api.projects['$get']({
        query: {
          workspaceId
        }
      });

      if (!response.ok) {
        return {
          data: {
            project: [],
            workspace: [],
            member: []
          }
        };
      }

      const { data } = await response.json();
      const transformedData = transformProjectsData(data);
      return { data: { ...transformedData } };
    }
  });
};
