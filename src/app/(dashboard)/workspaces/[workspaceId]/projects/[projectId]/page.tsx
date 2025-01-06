import Link from 'next/link';
import { Bolt, RefreshCcwDotIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';
import { getCurrentSprit } from '@/features/projects/actions/get-current-sprint';
import { getProject } from '@/features/projects/actions/get-project';
import { sumStoryPoints } from '@/features/projects/actions/sum-story-points';
import { TaskViewSwitcher } from '@/features/tasks/components/task-view-switcher';

type ProjectDetailPageProps = {
  params: {
    workspaceId: string;
    projectId: string;
  };
};
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const user = await getUserCurrentSession();
  const project = await getProject({
    projectId: params.projectId,
    workspaceId: params.workspaceId,
    user
  });

  const currentSprint = await getCurrentSprit({ projectId: params.projectId, user });
  const totalStoryPoints = await sumStoryPoints({ projectId: params.projectId });
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
      {currentSprint ? (
        <div className="flex flex-row gap-x-4">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Sprint Atual: </span>
            {currentSprint.name}
          </p>
          <span className="text-sm text-gray-600">
            {currentSprint?.startDate.toLocaleDateString('pt-BR')} -{' '}
            {currentSprint?.endDate?.toLocaleDateString('pt-BR')}
          </span>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Story points planejado: </span>
            {totalStoryPoints}
          </p>
        </div>
      ) : (
        <div className="flex flex-row gap-x-4">
          <p className="text-sm text-gray-600">Nenhuma sprint planejada.</p>
          <Link href={`/workspaces/${params.workspaceId}/projects/${params.projectId}/sprints`}>
            Criar Sprint
          </Link>
        </div>
      )}
      <TaskViewSwitcher />
    </div>
  );
}
