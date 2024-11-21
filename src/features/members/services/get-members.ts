import 'server-only'
import { db } from '@/lib/db.prisma';

type GetMembers = {
  workspaceId: string
}

export const getMembers = async ({ workspaceId }: GetMembers) => await db.member.findMany({
  where: {
    workspaces: {
      some: {
        id: workspaceId
      }
    }
  }, 
  include: {
    user: true
  }
});
