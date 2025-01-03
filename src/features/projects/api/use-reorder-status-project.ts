import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const reorderStatusProjectApi = client.api.projects[':projectId']['status']['reorder']['$put'];

type ReorderStatusProject = typeof reorderStatusProjectApi;
type ResponseType = InferResponseType<ReorderStatusProject, 201>['data'];
type RequestType = InferRequestType<ReorderStatusProject>;

export const useReorderStatusProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await reorderStatusProjectApi({
        json,
        param
      });

      if (!response.ok) {
        throw new Error('Erro ao criar workspace!');
      }

      const { data } = await response.json();
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['status', data.projectId] });

      toast.success('status reordenado com sucesso!');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao criar status para o projeto!');
    }
  });

  return mutation;
};
