import { db } from '@/lib/db.prisma';

type GetStatusProjectPositionProps = {
  projectId: string;
};

export const getStatusProjectPosition = async ({ projectId }: GetStatusProjectPositionProps) =>
  await db.status.findFirst({
    where: {
      projectId
    },
    select: {
      position: true
    },
    orderBy: {
      position: 'desc'
    }
  });
