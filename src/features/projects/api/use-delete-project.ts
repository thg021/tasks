import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Project = typeof client.api.projects;

type ResponseType = InferResponseType<Project[':projectId']['$delete'], 204>;
type RequestType = InferRequestType<Project[':projectId']['$delete']>;

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[':projectId']['$delete']({ param });

      if (!response.ok) {
        throw new Error('Erro ao criar workspace!');
      }

      return await response.json();
    },
    onSuccess: ({ data: projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });

      toast.success('Projeto deletado com sucesso!');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao deletar o projeto!');
    }
  });

  return mutation;
};
