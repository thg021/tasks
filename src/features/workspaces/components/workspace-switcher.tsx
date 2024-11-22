'use client';
import { RiAddCircleFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { map, size } from 'lodash';
import { Loader } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { WorkspaceAvatar } from '@/features/workspaces/components/workspace-avatar';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useCreateWorkspaceModal } from '../hooks/use-create-workspaces-modal';

export const WorkspaceSwitcher = () => {
  const {
    data: workspaces,
    isLoading,
    isError,
    isFetching
  } = useGetWorkspaces();
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { open } = useCreateWorkspaceModal();
  const onSelect = (value: string) => {
    router.push(`/workspaces/${value}`);
  };

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="flex  size-4 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200">
          <Loader className="size-4 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces </p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-70"
        />
      </div>
      <Select
        onValueChange={onSelect}
        value={isFetching ? 'loading' : workspaceId}
      >
        <SelectTrigger className="w-full bg-neutral-200 p-1 font-medium">
          <SelectValue placeholder="Selecione um workspace" />
        </SelectTrigger>
        {isFetching && (
          <SelectContent>
            <SelectItem value="loading">
              <div className="flex items-center justify-start gap-1 font-medium">
                <div className="size-4 animate-pulse rounded-full bg-neutral-300" />
                <span className="truncate">Carregando...</span>
              </div>
            </SelectItem>
          </SelectContent>
        )}
        <SelectContent>
          {map(workspaces?.data, (workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              <div className="flex items-center justify-start gap-1 font-medium">
                <WorkspaceAvatar
                  image={workspace.imageUrl || ''}
                  name={workspace.name}
                  className="border-solid-red border"
                />
                <span className="truncate">{workspace.name}</span>
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
