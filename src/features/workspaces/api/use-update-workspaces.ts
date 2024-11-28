import { useRouter } from 'next/navigation';
import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import type { ErrorResponse } from '@/types/routes.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Workspace = typeof client.api.workspace;

type ResponseType = InferResponseType<Workspace[':workspaceId']['$patch'], 200>;
type RequestType = InferRequestType<Workspace[':workspaceId']['$patch']>;

export const useUpdateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.workspace[':workspaceId']['$patch']({
        form,
        param
      });

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new Error(errorData.error || 'Unknown error occurred');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', data.id] });
      router.refresh();
      toast.success('Workspace criado com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
