import { db } from '@/lib/db.prisma';
import type { Prisma, TaskStatus } from '@prisma/client';

interface TaskFilters {
  workspaceId?: string;
  projectId?: string;
  assignedId?: string;
  status?: TaskStatus;
  search?: string;
  dueDate?: Date | { start?: Date; end?: Date };
}

export const getTasks = async (filters: TaskFilters) => {
  const where: Prisma.TaskWhereInput = {
    AND: []
  };

  // Adiciona filtros apenas se estiverem definidos
  if (filters.workspaceId) {
    where.workspaceId = filters.workspaceId;
  }

  if (filters.projectId) {
    where.projectId = filters.projectId;
  }

  if (filters.assignedId) {
    where.assignedId = filters.assignedId;
  }

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } }
    ];
  }

  if (filters.dueDate) {
    if (filters.dueDate instanceof Date) {
      where.dueDate = filters.dueDate;
    } else {
      where.dueDate = {
        ...(filters.dueDate.start && { gte: filters.dueDate.start }),
        ...(filters.dueDate.end && { lte: filters.dueDate.end })
      };
    }
  }

  return await db.task.findMany({
    where,
    include: {
      project: true,
      workspace: {
        include: {
          members: {
            select: {
              id: true,
              role: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  image: true
                }
              }
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};
