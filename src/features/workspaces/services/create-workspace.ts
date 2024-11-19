import 'server-only'
import { db } from '@/lib/db.prisma';
import type { CreateWorkspaceProps } from '@/features/workspaces/types';

export const createWorkspace = async ({ name, imageUrl, storageId, userId, role }: CreateWorkspaceProps) => await db.workspace.create({
  data: {
    name,
    imageUrl,
    storageId,
    members: {
      create: {
        userId,
        role
      },
    }
  },
});