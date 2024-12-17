import { db } from '@/lib/db.prisma';

type GetTaskId = {
  id: string;
  projectId: string;
};

export const getTask = async ({ id, projectId }: GetTaskId) =>
  await db.task.findFirst({
    where: {
      id,
      projectId
    },
    include: {
      project: true
    }
  });
