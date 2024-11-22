import 'server-only';
import { db } from '@/lib/db.prisma';

export const getWorkspacesById = async (userId: string) => await db.workspace.findMany({
    where: {
      members: {
        some: {
          userId
        }
      }
    },
    include: {
      members: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      created: 'desc'
    }
  });
