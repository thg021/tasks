import { db } from '@/lib/db.prisma';

type GetCurrentProjectSprintProps = {
  status?: number;
  projectId: string;
};

export const getCurrentProjectSprint = async ({
  status = 0,
  projectId
}: GetCurrentProjectSprintProps) =>
  await db.sprint.findFirst({
    where: {
      projectId,
      status
    }
  });
