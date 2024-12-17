import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Task = typeof client.api.task;

type ResponseType = InferResponseType<Task[':taskId']['$patch'], 201>;
type RequestType = InferRequestType<Task[':taskId']['$patch']>;

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.task[':taskId']['$patch']({
        json,
        param
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar a tarefa!');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success('Tarefa atualizada com sucesso!');
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
