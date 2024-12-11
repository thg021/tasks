import 'server-only';
import type { CreateTaskSchemaProps } from '@/features/tasks/schemas';
import { db } from '@/lib/db.prisma';

type CreateTaskProps = CreateTaskSchemaProps & { position: number };

export const createTask = async (data: CreateTaskProps) =>
  await db.task.create({
    data
  });
