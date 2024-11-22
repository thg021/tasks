import 'server-only';
import type { CreateWorkspaceProps } from '@/features/workspaces/types';
import { db } from '@/lib/db.prisma';

export const createWorkspace = async ({ name, imageUrl, storageId, userId, role }: CreateWorkspaceProps) => await db.workspace.create({
  data: {
    name,
    imageUrl,
    storageId,
    members: {
      create: {
       user: {
        connect: {
          id: userId,
          role 
        }
       }
      }
    }
  }
});