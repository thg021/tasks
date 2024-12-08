import 'server-only';
import type { CreateTaskSchema } from '@/features/tasks/schemas';
import { db } from '@/lib/db.prisma';

type CreateTaskProps = CreateTaskSchema & { position: number };

export const createTask = async (data: CreateTaskProps) =>
  await db.task.create({
    data
  });
