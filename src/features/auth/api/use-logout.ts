import { client } from "@/lib/rpc";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AuthLogin = typeof client.api.auth.logout;

type ResponseType = InferResponseType<AuthLogin["$post"]>;
/**
 * A React hook that provides a mutation function to log out the current user.
 * @returns A mutation object with the following properties:
 *   - mutate: A function that can be called to trigger the logout mutation
 *   - isLoading: A boolean indicating whether the logout mutation is currently in progress
 *   - error: An error object if the logout mutation failed
 *   - data: The response data from the successful logout mutation
 */
export const useLogout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();
      if (!response.ok) {
        throw new Error("Erro ao fazer logout!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logout realizado com sucesso!");
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current"] });
    }, 
    onError: (error) => {
      toast.error("Erro ao fazer logout!");
    }
  });

  return mutation;
};
