import 'server-only';
import { db } from '@/lib/db.prisma';
import type { DeleteStatusProjectProps } from '../types';

export const deleteStatusProject = async ({ statusId: id }: DeleteStatusProjectProps) =>
  await db.status.delete({
    where: { id }
  });
