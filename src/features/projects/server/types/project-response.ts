import type { Role } from '@prisma/client';

export type Project = {
  id: string;
  name: string;
  workspaceId: string;
  created: string;
  updated: string;
  workspace: Workspace;
};

export type Workspace = {
  id: string;
  name: string;
  imageUrl: string | null;
  storageId: string | null;
  created: string;
  updated: string;
  members: Member[];
};

export type Member = {
  id: string;
  created: string;
  updated: string;
  role: Role;
  userId: string;
  user: User;
};

export type User = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: string | null;
  image: string | null;
  password: string | null;
  createdAt: string;
  updatedAt: string;
};
