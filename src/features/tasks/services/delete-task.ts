import 'server-only';
import { db } from '@/lib/db.prisma';

type DeleteTaskProps = {
  id: string;
  workspaceId: string;
};

export const deleteTask = async ({ id, workspaceId }: DeleteTaskProps) =>
  await db.task.delete({
    where: {
      id,
      workspaceId
    }
  });
