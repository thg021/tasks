import 'server-only';
import type { UpdateProjectProps } from '@/features/projects/types';
import { db } from '@/lib/db.prisma';

export const updateProject = async ({ name, workspaceId, projectId }: UpdateProjectProps) =>
  await db.project.update({
    where: {
      id: projectId,
      workspaceId
    },
    data: {
      name
    }
  });
