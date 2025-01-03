import type { InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

type GetStatusProjectsProps = { projectId: string };
const getStatusProjectApi = client.api.projects[':projectId']['status']['$get'];
type ResponseType = InferResponseType<typeof getStatusProjectApi, 200>;
export const useGetStatusProject = ({ projectId }: GetStatusProjectsProps) => {
  return useQuery<ResponseType>({
    queryKey: ['status', projectId],
    queryFn: async () => {
      const response = await getStatusProjectApi({
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
