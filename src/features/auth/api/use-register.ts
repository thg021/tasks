import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

type RegisterAuth = typeof client.api.auth.register;

type ResponseType = InferResponseType<RegisterAuth["$post"]>;
type RequestType = InferRequestType<RegisterAuth["$post"]>["json"];

export const useRegister = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.register["$post"]({
        json,
      });
      return await response.json();
    },
  });

  return mutation;
};
