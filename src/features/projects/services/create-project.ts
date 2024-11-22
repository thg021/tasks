import 'server-only';
import type { CreateProjectProps } from '@/features/projects/types';
import { db } from '@/lib/db.prisma';

export const createProject = async ({ name, workspaceId }: CreateProjectProps) => await db.project.create({
  data: {
    name,
    workspaceId
  }
});