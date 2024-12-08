import type { Role } from '@prisma/client';

type Project = {
  id: string;
  name: string;
};

type Workspace = {
  id: string;
  name: string;
  imageUrl: string | null;
};

type Member = {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: Role; // Ajuste os roles conforme necessário
};

export type GetProjectsResponse = {
  data: {
    project: Project[];
    workspace: Workspace[];
    member: Member[];
  };
};
