import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Member = typeof client.api.members;

type ResponseType = InferResponseType<Member['$post'], 201>;
type RequestType = InferRequestType<Member['$post']>['json'];

export const useCreateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.members['$post']({
        json
      });

      if (!response.ok) {
        throw new Error('Erro ao criar membro!');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success('Membro criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['member', data] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao criar membro!');
    }
  });

  return mutation;
};
