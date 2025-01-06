import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getUserCurrentSession } from '@/features/auth/actions/get-user-current-session';
import { SprintsView } from '@/features/sprints/components/sprints-view';

type ProjectIdSettingPageProps = {
  params: {
    workspaceId: string;
    projectId: string;
  };
};
export default async function ProjectIdSettingPage({ params }: ProjectIdSettingPageProps) {
  await getUserCurrentSession();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-semibold">Sprint</h1>
        <div className="flex flex-row gap-x-2">
          <Button asChild>
            <Link href={`/workspaces/${params.workspaceId}/projects/${params.projectId}/sprints`}>
              <PlusIcon />
            </Link>
          </Button>
        </div>
      </div>

      <SprintsView />
    </div>
  );
}
