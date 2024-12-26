import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const apiMemberPatch = client.api.members[':memberId']['workspaces'][':workspaceId']['$patch'];
type MemberPatch = typeof apiMemberPatch;

type ResponseType = InferResponseType<MemberPatch, 201>;
type RequestType = InferRequestType<MemberPatch>;

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await apiMemberPatch({
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
      toast.error('Erro ao atualizar membro!');
    }
  });

  return mutation;
};
