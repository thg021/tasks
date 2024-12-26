import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';
import { client } from '@/lib/rpc';
import type { ErrorResponse } from '@/types/routes.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const apiDeleteMember = client.api.members[':memberId']['workspaces'][':workspaceId']['$delete'];

type Member = typeof apiDeleteMember;

type ResponseType = InferResponseType<Member, 204>;
type RequestType = InferRequestType<Member>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await apiDeleteMember({ param });

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new Error(errorData.error || 'Unknown error occurred');
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['member', data.memberId] });
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', data?.workspaceId] });

      toast.success('Member deletado com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
