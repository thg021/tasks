import type { InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

const apiGetMembers = client.api.members['workspaces'][':workspaceId']['$get'];
type MemberResponse = InferResponseType<typeof apiGetMembers, 200>;

export const useGetMembers = (workspaceId: string) => {
  const query = useQuery<MemberResponse, Error>({
    queryKey: ['members', workspaceId],
    queryFn: async () => {
      const response = await apiGetMembers({
        param: {
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
