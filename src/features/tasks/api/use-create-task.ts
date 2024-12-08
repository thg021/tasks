import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation } from '@tanstack/react-query';

type Task = typeof client.api.tasks;

type ResponseType = InferResponseType<Task['$post'], 201>;
type RequestType = InferRequestType<Task['$post']>['form'];

export const useCreateTask = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (form) => {
      const response = await client.api.tasks['$post']({
        form
      });

      if (!response.ok) {
        throw new Error('Erro ao criar a tarefa!');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Tarefa criada com sucesso!');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao criar tarefa!');
    }
  });

  return mutation;
};
