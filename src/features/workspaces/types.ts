import type { Prisma, Role } from '@prisma/client';

export type Workspace = Prisma.WorkspaceGetPayload<{}>

export type CreateWorkspaceProps = {
  name: string;
  imageUrl?: string;
  storageId?: string;
  userId: string;
  role: Role 
}

export type DeleteWorkspaceProps = {
  workspaceId: string;
}