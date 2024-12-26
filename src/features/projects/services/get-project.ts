import 'server-only';
import { db } from '@/lib/db.prisma';

type GetProjects = {
  projectId: string;
};

export const getProject = async ({ projectId }: GetProjects) =>
  await db.project.findFirst({
    where: {
      id: projectId
    }
  });
