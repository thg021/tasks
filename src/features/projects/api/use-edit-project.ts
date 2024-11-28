import { useRouter } from 'next/navigation';
import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Project = typeof client.api.projects;

type ResponseType = InferResponseType<Project['$patch'], 201>;
type RequestType = InferRequestType<Project['$patch']>['form'];

export const useEditProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (form) => {
      const response = await client.api.projects['$patch']({
        form
      });

      if (!response.ok) {
        throw new Error('Erro ao criar workspace!');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['projects', data.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['project', data.workspaceId, data.id] });
      router.refresh();
      toast.success('Projeto atualizado com sucesso!');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao criar projeto!');
    }
  });

  return mutation;
};
