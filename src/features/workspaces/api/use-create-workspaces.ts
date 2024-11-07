import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type Workspace = typeof client.api.workspace;

type ResponseType = InferResponseType<Workspace["$post"]>;
type RequestType = InferRequestType<Workspace["$post"]>["json"];

export const useCreateWorkspace = () => {
const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.workspace["$post"]({
        json,
      });

      if (!response.ok) {
        throw new Error("Erro ao criar workspace!");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success("Workspace criado com sucesso!");
    }, 
    onError: (error) => {
      toast.error("Erro ao criar workspace!");
    }
  });

  return mutation;
};
