import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteStatusProjectApi = client.api.projects[':projectId']['status'][':statusId']['$delete'];
type DeleteStatusProjectType = typeof deleteStatusProjectApi;
type ResponseType = InferResponseType<DeleteStatusProjectType, 204>;
type RequestType = InferRequestType<DeleteStatusProjectType>;

export const useDeleteStatusProject = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await deleteStatusProjectApi({ param });

      if (!response.ok) {
        throw new Error('Erro ao deletar o status!');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['status', data.projectId] });
      toast.success('status deletado com sucesso!');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao deletar o status!');
    }
  });

  return mutation;
};
