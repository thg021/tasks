import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = ({ workspaceId }: { workspaceId: string }) => {
  return useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const response = await client.api.projects["$get"]({
        query: {
          workspaceId,
        }
      });

      if (!response.ok) {
        return {
          data: [],
          total: 0,
        };
      }

      const data = await response.json();
      return data;
    }
  });
};
