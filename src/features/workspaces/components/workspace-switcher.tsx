'use client';
import { RiAddCircleFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { map, size } from 'lodash';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { WorkspaceAvatar } from '@/features/workspaces/components/workspace-avatar';
import { WorkspaceSwitcherLoading } from '@/features/workspaces/components/workspace-switcher-loading';
import { useWorkspaceId, useCreateWorkspaceModal } from '@/features/workspaces/hooks';

export const WorkspaceSwitcher = () => {
  const { data: workspaces, isLoading, isFetching } = useGetWorkspaces();
  const workspaceId = useWorkspaceId();
  const { open } = useCreateWorkspaceModal();
  const router = useRouter();
  const onSelect = (value: string) => {
    router.push(`/workspaces/${value}`);
  };

  if (isLoading) return <WorkspaceSwitcherLoading />;

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500 dark:text-neutral-100">Workspaces </p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-70 dark:text-neutral-100"
        />
      </div>
      <Select onValueChange={onSelect} value={isFetching ? 'loading' : workspaceId}>
        <SelectTrigger className="w-full bg-neutral-200 px-1 py-3 font-medium dark:bg-neutral-800">
          <SelectValue placeholder="Selecione um workspace" />
        </SelectTrigger>
        {isFetching && (
          <SelectContent>
            <SelectItem value="loading">
              <div className="flex items-center justify-start gap-1 font-medium">
                <div className="size-4 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-800" />
                <span className="truncate">Carregando...</span>
              </div>
            </SelectItem>
          </SelectContent>
        )}
        <SelectContent>
          {map(workspaces?.data, (workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              <div className="flex items-center justify-start gap-1 font-medium">
                <WorkspaceAvatar image={workspace.imageUrl || ''} name={workspace.name} />
                <div className="flex flex-col items-start">
                  <span className="truncate font-bold">{workspace.name}</span>
                  <div className="flex items-center gap-x-1 text-xs text-neutral-500 dark:text-neutral-100">
                    {workspace.members.length} membro(s)
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
          {size(workspaces?.data) === 0 && (
            <SelectItem value="empty">
              <div className="flex items-center justify-start gap-1 font-medium">
                <span className="truncate">Nenhum workspace encontrado</span>
              </div>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
