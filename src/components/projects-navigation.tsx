'use client';
import { RiAddCircleFill } from 'react-icons/ri';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { map } from 'lodash';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { ProjectNavigationLoading } from '@/features/projects/components/project-navigation-loading';
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { cn } from '@/lib/utils';

export const ProjectsNavigation = () => {
  const { open } = useCreateProjectModal();
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const { data: projects, isLoading } = useGetProjects({ workspaceId });

  if (isLoading) return <ProjectNavigationLoading />;

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500 dark:text-neutral-100">Project </p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-70 dark:text-neutral-100"
        />
      </div>
      {isLoading && <p className="text-xs text-muted-foreground">Carregando...</p>}
      <div className="flex flex-col gap-y-1">
        {map(projects?.data.project, (project) => {
          const href = `/workspaces/${workspaceId}/projects/${project.id}`;
          const isActive = pathname === href;
          return (
            <Link href={href} key={project.id}>
              <div
                className={cn(
                  'flex cursor-pointer items-center gap-x-3 rounded-md p-2 transition hover:bg-neutral-200 dark:text-neutral-200 dark:hover:text-neutral-500',
                  isActive && 'bg-neutral-200 dark:bg-neutral-800'
                )}
              >
                <ProjectAvatar name={project.name} className="size-6" isActive />
                <span className="truncate text-sm">{project.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
