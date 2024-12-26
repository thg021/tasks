import 'server-only';
import { db } from '@/lib/db.prisma';

type GetProjectsByUserIdProps = {
  workspaceId: string;
};

export const GetProjectsByUserId = async ({ workspaceId }: GetProjectsByUserIdProps) =>
  await db.project.findMany({
    where: {
      workspaceId
    }
  });
