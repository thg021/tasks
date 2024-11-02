import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

type AuthLogin = typeof client.api.auth.login;

type ResponseType = InferResponseType<AuthLogin["$post"]>;
type RequestType = InferRequestType<AuthLogin["$post"]>["json"];

export const useLogin = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.login["$post"]({
        json,
      });
      return await response.json();
    },
  });

  return mutation;
};
