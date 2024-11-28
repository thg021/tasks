import 'server-only';
import { db } from '@/lib/db.prisma';

type GetProjects = {
  projectId: string;
  userId: string;
};

export const getProject = async ({ projectId, userId }: GetProjects) =>
  await db.project.findFirst({
    where: {
      userId,
      id: projectId
    }
  });
