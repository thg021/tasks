import 'server-only';
import { db } from '@/lib/db.prisma';

type GetMemberByWorkspaceProps = {
  userId: string
  workspaceId: string
}

export const getMemberByWorkspace = async ({ userId, workspaceId }: GetMemberByWorkspaceProps) => await db.member.findFirst({
  where: {
    userId,
    workspaces: {
      some: {
        id: workspaceId
      }
    }
  },
  include: {
    workspaces: true
  }
});
