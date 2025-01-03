export type CreateProjectProps = {
  name: string;
  workspaceId: string;
  userId: string;
};

export type CreateStatusProjectProps = {
  name: string;
  color?: string;
  projectId: string;
  position: number;
};

export type UpdateProjectProps = {
  name: string;
  workspaceId: string;
  projectId: string;
};

export type DeleteProjectProps = {
  projectId: string;
};

export type DeleteStatusProjectProps = {
  statusId: string;
};
