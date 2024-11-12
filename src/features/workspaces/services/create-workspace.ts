import 'server-only'
import { db } from '@/lib/db.prisma';
import type { Role } from '@prisma/client';

type CreateWorkspaceProps = {
  name: string;
  imageUrl?: string;
  userId: string;
  role: Role 
}

export const createWorkspace = async ({ name, imageUrl, userId, role }: CreateWorkspaceProps) => await db.workspace.create({
  data: {
    name,
    imageUrl,
    members: {
      create: {
        userId,
        role
      },
    }
  },
});