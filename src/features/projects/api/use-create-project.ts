import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Project = typeof client.api.projects;

type ResponseType = InferResponseType<Project[':workspaceId']['$post'], 201>;
type RequestType = InferRequestType<Project[':workspaceId']['$post']>['form'];

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ name, workspaceId }) => {
      const response = await client.api.projects[':workspaceId']['$post']({
        form: {
          name
        },
        param: {
          workspaceId: workspaceId || ''
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao criar workspace!');
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto criado com sucesso!');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao criar projeto!');
    }
  });

  return mutation;
};
