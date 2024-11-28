export type CreateProjectProps = {
  name: string;
  workspaceId: string;
  userId: string;
};

export type UpdateProjectProps = {
  name: string;
  workspaceId: string;
  projectId: string;
};

export type DeleteProjectProps = {
  projectId: string;
};
