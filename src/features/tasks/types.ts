export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  QA = 'QA',
  DONE = 'DONE'
}

export type Project = {
  id: string;
  name: string;
  workspaceId: string;
  created: string;
  updated: string;
};

export type Workspace = {
  id: string;
  name: string;
  imageUrl?: string | null;
  storageId?: string | null;
  created: string;
  updated: string;
  members: Member[];
};

export type Member = {
  id: string;
  role: string;
  user: User;
};

export type User = {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
};

export type Task = {
  id: string;
  name: string;
  description?: string | null;
  dueDate: string;
  position: number;
  status: string;
  projectId: string;
  workspaceId: string;
  assignedId: string;
  createdAt: string;
  updatedAt: string;
  project: Project;
  workspace: Workspace;
};
