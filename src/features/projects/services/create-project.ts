import 'server-only'
import { db } from '@/lib/db.prisma';
import type { CreateProjectProps } from '@/features/projects/types';

export const createProject = async ({ name, workspaceId }: CreateProjectProps) => await db.project.create({
  data: {
    name,
    workspaceId
  },
});