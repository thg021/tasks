import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const apiMemberPost = client.api.members['workspaces'][':workspaceId']['$post'];
type MemberPost = typeof apiMemberPost;

type ResponseType = InferResponseType<MemberPost, 201>;
type RequestType = InferRequestType<MemberPost>;

export const useCreateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await apiMemberPost({
        json,
        param
      });

      if (!response.ok) {
        throw new Error('Erro ao criar membro!');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success('Membro criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['member', data] });
      queryClient.invalidateQueries({ queryKey: ['workspace', data.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['members', data.workspaceId] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Erro ao criar membro!');
    }
  });

  return mutation;
};
