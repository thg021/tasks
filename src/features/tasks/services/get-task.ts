import { db } from '@/lib/db.prisma';

type GetTaskId = {
  id: string;
  workspaceId: string;
};

export const getTask = async ({ id, workspaceId }: GetTaskId) =>
  await db.task.findFirst({
    where: {
      id,
      workspaceId
    },
    include: {
      project: true,
      workspace: {
        include: {
          members: {
            include: {
              user: true
            }
          }
        }
      }
    }
  });
