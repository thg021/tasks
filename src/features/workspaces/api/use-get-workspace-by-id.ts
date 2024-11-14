import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType, InferRequestType } from "hono/client";
type WorkspaceResponse = InferResponseType<typeof client.api.workspace[":workspaceId"]["$get"], 200>;

export const useGetWorkspaceById = (workspaceId: string) => {
  const query = useQuery<WorkspaceResponse, Error>({
    queryKey: ["workspace", workspaceId],
    queryFn: async (): Promise<WorkspaceResponse> => {
      try { const response = await client.api.workspace[":workspaceId"]["$get"]({
        param: {
          workspaceId,
        }
      });

      if (!response.ok) {
         throw new Error(`Failed to fetch workspace with ID: ${workspaceId}`);
      }

      const data = await response.json();
      return data
        
      } catch (error) {
        console.error("Error fetching workspace:", error);
        throw error;

      }
     
    },
  });

  return query;
};
