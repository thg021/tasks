import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type RegisterAuth = typeof client.api.auth.register;

type ResponseType = InferResponseType<RegisterAuth["$post"]>;
type RequestType = InferRequestType<RegisterAuth["$post"]>["json"];

export const useRegister = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.register["$post"]({
        json,
      });
      return await response.json();
    },  onSuccess: () => {
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current"] });
    }
  });

  return mutation;
};
