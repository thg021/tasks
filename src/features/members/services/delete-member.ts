import 'server-only';
import { db } from '@/lib/db.prisma';

export const deleteMember = async ({ memberId }: { memberId: string }) =>
  await db.member.delete({
    where: { id: memberId }
  });
