import 'server-only'
import { db } from '@/lib/db.prisma';
import type { DeleteWorkspaceProps } from '@/features/workspaces/types';

export const deleteWorkspace = async ({ workspaceId }: DeleteWorkspaceProps) =>   await db.workspace.delete({
  where: { id: workspaceId }
 });