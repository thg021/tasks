import 'server-only';
import type { CreateStatusProjectProps } from '@/features/projects/types';
import { db } from '@/lib/db.prisma';

export const createStatusProject = async ({
  name,
  color,
  position,
  projectId
}: CreateStatusProjectProps) =>
  await db.status.create({
    data: {
      name,
      color,
      position,
      project: {
        connect: {
          id: projectId
        }
      }
    }
  });
