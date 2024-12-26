import type { InferRequestType, InferResponseType } from 'hono';
import { client } from '@/lib/rpc';
import { useQuery } from '@tanstack/react-query';

const apiGetMember = client.api.members[':memberId']['workspaces'][':workspaceId']['$get'];

type MemberResponse = InferResponseType<typeof apiGetMember, 200>;
type MemberRequest = InferRequestType<typeof apiGetMember>;

type UseGetMemberProps = {
  memberId: string;
  workspaceId: string;
};
export const useGetMember = ({ memberId, workspaceId }: UseGetMemberProps) => {
  const query = useQuery<MemberResponse, Error, MemberRequest>({
    queryKey: ['member', memberId],
    queryFn: async () => {
      const response = await apiGetMember({
        param: { memberId, workspaceId }
      });

      const data = await response.json();

      return data;
    }
  });

  return query;
};
