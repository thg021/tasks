import 'server-only';
import { db } from '@/lib/db.prisma';

type GetMemberByIdProps = {
  id: string;
  workspaceId: string;
};

export const getMember = async ({ id, workspaceId }: GetMemberByIdProps) =>
  await db.member.findFirst({
    where: {
      id
    },
    include: {
      user: {
        include: {
          projects: {
            where: {
              workspaceId
            }
          },
          avatar: true
        }
      },
      workspaces: true
    }
  });
