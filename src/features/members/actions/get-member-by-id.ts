import type { User } from '@/features/auth/types';
import { GetProjectsByUserId } from '@/features/projects/services/get-projects-by-user-id';
import { getMemberById } from '../services/get-member-by-id';

type GetMemberProps = {
  user: User;
  memberId: string;
  workspaceId: string;
};

export const getMember = async ({ user, memberId, workspaceId }: GetMemberProps) => {
  try {
    if (!user) {
      throw new Error('Unauthorized: User not found');
    }

    const member = await getMemberById({
      id: memberId,
      workspaceId
    });

    if (!member) {
      throw new Error('Unauthorized: Invalid workspaceId');
    }

    const projects = await GetProjectsByUserId({ workspaceId });

    return {
      ...member,
      projects
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error to get project');
  }
};
