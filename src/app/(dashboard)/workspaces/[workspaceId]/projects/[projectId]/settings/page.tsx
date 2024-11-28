import { redirect } from 'next/navigation';
import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';
import { getProject } from '@/features/projects/actions/get-project';
import { EditProjectForm } from '@/features/projects/components/edit-project-form';

type ProjectIdSettingPageProps = {
  params: {
    workspaceId: string;
    projectId: string;
  };
};
export default async function ProjectIdSettingPage({ params }: ProjectIdSettingPageProps) {
  const user = await getUserCurrentSession();

  const project = await getProject({
    projectId: params.projectId,
    workspaceId: params.workspaceId,
    user
  });
  if (!project) redirect(`/workspaces/${params.workspaceId}/projects/${params.projectId}`);

  return (
    <div className="flex flex-col">
      <EditProjectForm initialValues={project} />
    </div>
  );
}
