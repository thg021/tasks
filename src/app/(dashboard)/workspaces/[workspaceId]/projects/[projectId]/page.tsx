import Link from 'next/link';
import { Bolt, RefreshCcwDotIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';
import { getProject } from '@/features/projects/actions/get-project';
import { TaskViewSwitcher } from '@/features/tasks/components/task-view-switcher';

type WorkspaceIdSettingPageProps = {
  params: {
    workspaceId: string;
    projectId: string;
  };
};
export default async function WorkspaceIdSettingPage({ params }: WorkspaceIdSettingPageProps) {
  const user = await getUserCurrentSession();
  const project = await getProject({
    projectId: params.projectId,
    workspaceId: params.workspaceId,
    user
  });

  if (!project) {
    return <div>Projeto não encontrado.</div>;
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold">{project.name}</h1>
        <div className="flex flex-row gap-x-2">
          <Button asChild>
            <Link href={`/workspaces/${params.workspaceId}/projects/${params.projectId}/sprints`}>
              <RefreshCcwDotIcon />
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/workspaces/${params.workspaceId}/projects/${params.projectId}/settings`}>
              <Bolt />
            </Link>
          </Button>
        </div>
      </div>

      <TaskViewSwitcher />
    </div>
  );
}
