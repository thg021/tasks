import 'server-only'
import { db } from '@/lib/db.prisma';
import type { Role } from '@prisma/client';

type GetMemberByIdProps = {
  userId?: string
  workspaceId: string
  role?: Role
}

export const getMemberById = async ({ userId, workspaceId, role = "ADMIN"}: GetMemberByIdProps) => await db.member.findFirst({
  where: {
    userId,
    workspaceId,
    role
  }
});
