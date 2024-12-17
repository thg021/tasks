import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Task = typeof client.api.task;

type ResponseType = InferResponseType<Task[':projectId'][':taskId']['$delete'], 200>;
type RequestType = InferRequestType<Task[':projectId'][':taskId']['$delete']>;

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.task[':projectId'][':taskId']['$delete']({
        param
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar a tarefa!');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success(`Tarefa ${data?.name} do projeto ${data?.project.name} excluída com sucesso`);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', data.id] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao criar tarefa!');
    }
  });

  return mutation;
};
