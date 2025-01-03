import 'server-only';
import { db } from '@/lib/db.prisma';

type GetStatusProjectByIdProps = {
  statusId: string;
};

export const getStatusProjectById = async ({ statusId }: GetStatusProjectByIdProps) =>
  await db.status.findUnique({
    where: {
      id: statusId
    }
  });
