import 'server-only';
import { db } from '@/lib/db.prisma';

type DeleteTaskProps = {
  id: string;
  projectId: string;
};

export const deleteTask = async ({ id, projectId }: DeleteTaskProps) =>
  await db.task.delete({
    where: {
      id,
      projectId
    }
  });
