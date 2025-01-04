import 'server-only';
import type { CreateInitialTaskSchemaProps } from '@/features/tasks/schemas';
import { db } from '@/lib/db.prisma';

type CreateTaskProps = CreateInitialTaskSchemaProps & {
  position: number;
  workspaceId: string;
  projectId: string;
  userStoryId: string;
};

export const createTask = async (data: CreateTaskProps) =>
  await db.task.create({
    data
  });
