import 'server-only';
import { db } from '@/lib/db.prisma';

type GetStatusProject = {
  projectId: string;
};

export const getStatusProject = async ({ projectId }: GetStatusProject) =>
  await db.status.findMany({
    where: {
      projectId
    },
    orderBy: {
      position: 'asc'
    }
  });
