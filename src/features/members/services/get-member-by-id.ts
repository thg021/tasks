import 'server-only';
import { db } from '@/lib/db.prisma';

type GetMemberByIdProps = {
  id: string;
  workspaceId: string;
};

export const getMemberById = async ({ id, workspaceId }: GetMemberByIdProps) =>
  await db.member.findFirst({
    where: {
      userId: id
    },
    include: {
      user: {
        include: {
          projects: {
            where: {
              workspaceId
            }
          }
        }
      },
      workspaces: true
    }
  });
