import type { User } from '@/features/auth/types';
import { getCurrentProjectSprint } from '@/features/sprints/service/get-current-project-sprint';

type GetCurrentSpritProps = {
  user: User;
  projectId: string;
};

export const getCurrentSprit = async ({ projectId, user }: GetCurrentSpritProps) => {
  try {
    if (!user) {
      throw new Error('User not found');
    }

    const sprint = await getCurrentProjectSprint({ projectId, status: 1 });

    return sprint;
  } catch (error) {
    console.error(error);
    throw new Error('Error to get project');
  }
};
