import type { User } from '@/features/auth/types';
import { getMemberByWorkspace } from '@/features/members/services/get-member-by-workspace';
import { getProject as getProjectService } from '@/features/projects/services/get-project';

type GetProjectProps = {
  user: User;
  projectId: string;
  workspaceId: string;
};

export const getProject = async ({ projectId, workspaceId, user }: GetProjectProps) => {
  try {
    if (!user) {
      throw new Error('User not found');
    }

    const member = await getMemberByWorkspace({
      workspaceId,
      userId: user.id
    });

    if (!member) {
      throw new Error('Unauthorized: Invalid workspaceId');
    }

    const project = await getProjectService({
      projectId,
      userId: user.id
    });

    return project;
  } catch (error) {
    console.error(error);
    throw new Error('Error to get project');
  }
};
