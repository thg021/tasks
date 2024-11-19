import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RegisterAuth = typeof client.api.authenticated.register;

type ResponseType = InferResponseType<RegisterAuth["$post"]>;
type RequestType = InferRequestType<RegisterAuth["$post"]>["json"];

export const useRegister = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.authenticated.register["$post"]({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }
      return await response.json();
    },  
    onSuccess: () => {
      toast.success("Usuário criado com sucesso!")
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current"] });
    }, 
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao registrar usuário!");
    }
  });

  return mutation;
};
