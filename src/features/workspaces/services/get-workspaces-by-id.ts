import 'server-only'
import { db } from '@/lib/db.prisma';

export  const getWorkspacesById = async (userId: string) => await db.workspace.findMany({
  include: {
    members: {
      where: {
        userId
      },
    },
  },
});