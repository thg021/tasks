import 'server-only';
import { db } from '@/lib/db.prisma';

type GetProjects = {
  workspaceId: string
}

export const getProjects = async ({ workspaceId }: GetProjects) => await db.project.findMany({
  where: {
    workspaceId 
  }
});
