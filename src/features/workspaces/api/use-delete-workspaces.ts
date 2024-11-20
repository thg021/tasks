import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type Workspace = typeof client.api.workspace;

type ResponseType = InferResponseType<Workspace[':workspaceId']["$delete"], 204>;
type RequestType = InferRequestType<Workspace[':workspaceId']["$delete"]>;

export const useDeleteWorkspace = () => {
const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspace[':workspaceId']["$delete"]({ param });

      if (!response.ok) {
        throw new Error("Erro ao criar workspace!");
      }
      
      return await response.json();
    },
    onSuccess: ({ data: workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", workspaceId] });

      toast.success("Workspace deletado com sucesso!");
    }, 
    onError: (error) => {
      console.error(error)
      toast.error("Erro ao deletar o workspace!");
    }
  });

  return mutation;
};
