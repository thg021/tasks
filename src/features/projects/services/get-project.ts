import 'server-only'
import { db } from '@/lib/db.prisma';

type GetProjects = {
  workspaceId: string
  projectId: string
}

export const getProject = async ({ workspaceId, projectId: id }: GetProjects) => await db.project.findFirst({
  where: {
    id, 
    workspaceId, 
  }
});
