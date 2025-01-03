import { db } from '@/lib/db.prisma';
import type { Prisma } from '@prisma/client';

interface TaskFilters {
  workspaceId?: string;
  projectId?: string;
  assignedId?: string;
  status?: string;
  search?: string;
  dueDate?: Date | { start?: Date; end?: Date };
  pagination?: {
    page: number;
    limit: number;
  };
}

type Metadata = {
  total: number;
  pages: number;
  currentPage: number;
  perPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type Project = {
  id: string;
  name: string;
  workspaceId: string;
  created: Date;
  updated: Date;
};

type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

type Member = {
  id: string;
  role: string;
  user: User;
};

type Workspace = {
  id: string;
  name: string;
  imageUrl: string | null;
  storageId: string | null;
  created: Date;
  updated: Date;
  members: Member[];
};

type TaskResponseDB = {
  tasks: {
    id: string;
    name: string;
    description: string | null;
    url: string | null;
    dueDate: Date | null;
    position: number;
    status: string;
    projectId: string;
    workspaceId: string;
    assignedId: string;
    createdAt: Date;
    updatedAt: Date;
    project: Project;
    workspace: Workspace;
  }[];
  metadata: Metadata;
};

export const getTasks = async (filters: TaskFilters): Promise<TaskResponseDB> => {
  const page = Number(filters.pagination?.page) || 1;
  const limit = Number(filters.pagination?.limit) || 10;
  const skip = (page - 1) * limit;

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

  const tasks = await db.task.findMany({
    skip,
    take: limit,
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

  const total = await db.task.count({ where });
  const totalPages = Math.ceil(total / limit);
  return {
    tasks,
    metadata: {
      total,
      pages: totalPages,
      currentPage: page,
      perPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
};
