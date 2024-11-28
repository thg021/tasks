import 'server-only';
import { db } from '@/lib/db.prisma';
import type { DeleteProjectProps } from '../types';

export const deleteProject = async ({ projectId: id }: DeleteProjectProps) =>
  await db.project.delete({
    where: { id }
  });
