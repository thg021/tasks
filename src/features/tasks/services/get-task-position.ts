import { db } from '@/lib/db.prisma';
import type { TaskStatus } from '@prisma/client';

type HighestPositionTaskProps = {
  status: TaskStatus;
  workspaceId: string;
};

export const highestPositionTask = async ({ status, workspaceId }: HighestPositionTaskProps) =>
  await db.task.findFirst({
    where: {
      status,
      workspaceId
    },
    orderBy: {
      position: 'asc'
    }
  });
