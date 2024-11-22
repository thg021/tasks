import 'server-only';
import type { DeleteWorkspaceProps } from '@/features/workspaces/types';
import { db } from '@/lib/db.prisma';

export const deleteWorkspace = async ({ workspaceId }: DeleteWorkspaceProps) =>   await db.workspace.delete({
  where: { id: workspaceId }
 });