import { db } from '@/lib/db.prisma';

type HighestPositionTaskProps = {
  status: string;
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
