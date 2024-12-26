import type { Role } from '@prisma/client';
import type { User } from './User';
import type { Workspace } from './Workspace';

export type Member = {
  id: string;
  created: string | Date | null;
  updated: string | Date | null;
  role: Role;
  user?: User;
  workspaces: Workspace[];
};
