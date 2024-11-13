import 'server-only'
import { db } from '@/lib/db.prisma';

export const getWorkspacesById = async (userId: string) => await db.workspace.findMany({

    where: {
      members: {
        some: {
          userId: userId
        }
      }
    },
    include: {
      members: {
        where: {
          userId
        },
        select: {
          role: true,
          id: true
        }
      },
      _count: {
        select: {
          members: true,
        }
      }
    },
    orderBy: {
      created: 'desc'
    }
  })
