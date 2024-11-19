import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type Workspace = typeof client.api.workspace;

type ResponseType = InferResponseType<Workspace[':workspaceId']["$patch"], 200>;
type RequestType = InferRequestType<Workspace[':workspaceId']["$patch"]>;

export const useUpdateWorkspace = () => {
const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({form, param }) => {
      const response = await client.api.workspace[':workspaceId']["$patch"]({
        form,
        param
      });

      if (!response.ok) {
        throw new Error("Erro ao criar workspace!");
      }
      
      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.id] });

      toast.success("Workspace criado com sucesso!");
    }, 
    onError: (error) => {
      console.error(error)
      toast.error("Erro ao atualizar o workspace!");
    }
  });

  return mutation;
};
