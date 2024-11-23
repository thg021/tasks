import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkspaces = () => {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const response = await client.api.workspace['$get']();

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
