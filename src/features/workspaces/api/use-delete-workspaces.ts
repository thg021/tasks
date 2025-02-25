import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import type { ErrorResponse } from '@/types/routes.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Workspace = typeof client.api.workspace;

type ResponseType = InferResponseType<Workspace[':workspaceId']['$delete'], 204>;
type RequestType = InferRequestType<Workspace[':workspaceId']['$delete']>;

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.workspace[':workspaceId']['$delete']({ param });

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new Error(errorData.error || 'Unknown error occurred');
      }

      return await response.json();
    },
    onSuccess: ({ data: workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', workspaceId] });

      toast.success('Workspace deletado com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
