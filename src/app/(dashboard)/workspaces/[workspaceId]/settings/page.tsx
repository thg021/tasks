import { redirect } from 'next/navigation';
import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';
import { EditWorkspaceForm } from '@/features/workspaces/components/edit-workspace-form';
import { getWorkspaceById } from '@/features/workspaces/services';

type WorkspaceIdSettingPageProps = {
  params: {
    workspaceId: string;
  };
};
export default async function WorkspaceIdSettingPage({ params }: WorkspaceIdSettingPageProps) {
  const user = await getUserCurrentSession();
  const workspace = await getWorkspaceById({
    userId: user?.id,
    workspaceId: params.workspaceId
  });

  if (!workspace) redirect(`/workspaces/${params.workspaceId}`);

  return (
    <div className="flex flex-col">
      <EditWorkspaceForm initialValues={workspace} />
    </div>
  );
}
