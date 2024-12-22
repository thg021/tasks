import 'server-only';
import type { CreateTaskSchemaProps } from '@/features/tasks/schemas';
import { db } from '@/lib/db.prisma';

type UpdateTaskProps = { id: string } & Partial<CreateTaskSchemaProps>;

export const updateTask = async (data: UpdateTaskProps) =>
  await db.task.update({
    where: {
      id: data.id,
      workspaceId: data.workspaceId
    },
    data
  });
