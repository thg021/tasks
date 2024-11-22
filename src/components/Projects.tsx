"use client";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { map } from "lodash";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

export const Projects = () => {
  const { open } = useCreateProjectModal();
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const { data: projects, isLoading } = useGetProjects({ workspaceId });
  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Project </p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-70 transition"
        />
      </div>
      {isLoading && (
        <p className="text-xs text-muted-foreground">Carregando...</p>
      )}
      <div className="flex flex-col gap-y-1">
        {map(projects?.data, (project) => {
          const href = `/workspaces/${workspaceId}/projects/${project.id}`;
          const isActive = pathname === href;
          return (
            <Link href={href} key={project.id}>
              <div
                className={cn(
                  "flex items-center gap-x-3 cursor-pointer rounded-md p-2 hover:bg-neutral-200 transition",
                  isActive && "bg-neutral-200"
                )}
              >
                <ProjectAvatar name={project.name} className="size-6" />
                <span className="text-sm truncate">{project.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
