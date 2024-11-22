import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Workspace = typeof client.api.workspace;

type ResponseType = InferResponseType<Workspace['$post']>;
type RequestType = InferRequestType<Workspace['$post']>['form'];

export const useCreateWorkspace = () => {
const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (form) => {
      const response = await client.api.workspace['$post']({
        form
      });

      if (!response.ok) {
        throw new Error('Erro ao criar workspace!');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      toast.success('Workspace criado com sucesso!');
    }, 
    onError: (error) => {
      toast.error('Erro ao criar workspace!');
    }
  });

  return mutation;
};
