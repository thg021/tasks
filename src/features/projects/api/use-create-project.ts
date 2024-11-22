import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Project = typeof client.api.projects;

type ResponseType = InferResponseType<Project['$post'], 201>;
type RequestType = InferRequestType<Project['$post']>['form'];

export const useCreateProject = () => {
const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (form) => {
      const response = await client.api.projects['$post']({
        form
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
      console.log(error);
      toast.error('Erro ao criar projeto!');
    }
  });

  return mutation;
};
