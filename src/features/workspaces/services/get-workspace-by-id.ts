import 'server-only';
import { db } from '@/lib/db.prisma';

type GetWorkspaceByIdRequest = {
  userId?: string;
  workspaceId: string;
};

export const getWorkspaceById = async ({ userId, workspaceId }: GetWorkspaceByIdRequest) =>
  await db.workspace.findFirst({
    where: {
      id: workspaceId,
      members: {
        some: {
          userId
        }
      }
    },
    include: {
      projects: true
    }
  });
