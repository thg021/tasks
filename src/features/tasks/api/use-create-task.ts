import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Task = typeof client.api.task;

type ResponseType = InferResponseType<Task['$post'], 201>;
type RequestType = InferRequestType<Task['$post']>['form'];

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (form) => {
      const response = await client.api.task['$post']({
        form
      });

      if (!response.ok) {
        throw new Error('Erro ao criar a tarefa!');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success('Tarefa criada com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['tasks', data.workspaceId] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao criar tarefa!');
    }
  });

  return mutation;
};
