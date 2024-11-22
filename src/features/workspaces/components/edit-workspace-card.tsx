'use client';
import { useGetWorkspaceById } from '../api/use-get-workspace-by-id';

type EditWorkspaceCardProps = {
  workspaceId: string;
};
export const EditWorkspaceCard = ({ workspaceId }: EditWorkspaceCardProps) => {
  const { data: workspace, isLoading } = useGetWorkspaceById(workspaceId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <pre>{JSON.stringify(workspace, null, 2)}</pre>
    </div>
  );
};
