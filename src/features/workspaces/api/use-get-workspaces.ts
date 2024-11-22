import { client } from '@/lib/rpc';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetWorkspaces = () => {
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries({ queryKey: ['members'] });
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
