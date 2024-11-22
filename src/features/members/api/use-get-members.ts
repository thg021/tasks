import type { InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

type MemberResponse = InferResponseType<typeof client.api.members['$get'], 200>;


export const useGetMembers = (workspaceId: string) => {
  const query = useQuery<MemberResponse, Error>({
    queryKey: ['members', workspaceId],
    queryFn: async () => {
      const response = await client.api.members['$get']({
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

  return query;
};
