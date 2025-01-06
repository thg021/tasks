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
  workspaceId: string | Date;
  created: string | Date;
  updated: string | Date;
};

export type Workspace = {
  id: string;
  name: string;
  imageUrl: string | null;
  storageId: string | null;
  created: string | Date;
  updated: string | Date;
  members: Member[];
};

export type Member = {
  id: string;
  role: string;
  user: User;
};

export type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

export type Task = {
  id: string;
  name: string;
  url: string | null;
  description: string | null;
  dueDate: Date | string | null;
  position: number;
  status: string;
  projectId: string;
  workspaceId: string | null;
  assignedId: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  userAssigned?: Member;
  userStoryId?: string | null;
  storyPoints?: number | null;
  sprintId?: string | null;
  project: Project;
};
