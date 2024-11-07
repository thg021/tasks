import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type AuthLogin = typeof client.api.auth.login;

type ResponseType = InferResponseType<AuthLogin["$post"]>;
type RequestType = InferRequestType<AuthLogin["$post"]>["json"];

export const useLogin = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.login["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current"] });
    }
  });

  return mutation;
};
