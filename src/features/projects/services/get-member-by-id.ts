import 'server-only';
import { db } from '@/lib/db.prisma';

type GetMemberByIdProps = {
  userId: string;
};

export const getMemberById = async ({ userId }: GetMemberByIdProps) =>
  await db.member.findFirst({
    where: {
      userId
    },
    include: {
      user: true,
      workspaces: true
    }
  });
