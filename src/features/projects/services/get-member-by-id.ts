import 'server-only'
import { db } from '@/lib/db.prisma';
import type { Role } from '@prisma/client';

type GetMemberByIdProps = {
  userId: string
}

export const getMemberById = async ({ userId, }: GetMemberByIdProps) => await db.member.findFirst({
  where: {
    userId
  },
  include: {
    user: true,
    workspaces: true,
  }
});
