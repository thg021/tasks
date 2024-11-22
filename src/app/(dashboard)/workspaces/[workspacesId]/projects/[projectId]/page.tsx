import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';
import { getProject } from '@/features/projects/actions/get-project';

type WorkspaceIdSettingPageProps = {
  params: {
    workspaceId: string;
    projectId: string;
  };
};
export default async function WorkspaceIdSettingPage({
  params
}: WorkspaceIdSettingPageProps) {
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
        <h1>{project.name}</h1>
        <Button>
          <PencilIcon />
          <span>Editar projeto</span>
        </Button>
      </div>
      <Separator />
    </div>
  );
}
