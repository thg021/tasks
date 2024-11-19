import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AuthLogin = typeof client.api.authenticated.login

type ResponseType = InferResponseType<AuthLogin["$post"]>;
type RequestType = InferRequestType<AuthLogin["$post"]>["json"];

export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.authenticated.login["$post"]({
        json,
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login!");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Login realizado com sucesso!");
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current"] });
    }, 
    onError: (error) => {
      console.error(error);
      toast.error("Erro ao fazer login!");
    }
  });

  return mutation;
};
