"use client";
import { Loader } from "lucide-react";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { RiAddCircleFill } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { map, size } from "lodash";
import { WorkspaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspaces-modal";

export const WorkspaceSwitcher = () => {
  const {
    data: workspaces,
    isLoading,
    isError,
    isFetching,
  } = useGetWorkspaces();
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { open } = useCreateWorkspaceModal();
  const onSelect = (value: string) => {
    router.push(`/workspaces/${value}`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="size-4  rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
          <Loader className="size-4 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces </p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-70 transition"
        />
      </div>
      <Select
        onValueChange={onSelect}
        value={isFetching ? "loading" : workspaceId}
      >
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="Selecione um workspace" />
        </SelectTrigger>
        {isFetching && (
          <SelectContent>
            <SelectItem value="loading">
              <div className="flex justify-start items-center gap-1 font-medium">
                <div className="size-4 animate-pulse rounded-full bg-neutral-300" />
                <span className="truncate">Carregando...</span>
              </div>
            </SelectItem>
          </SelectContent>
        )}
        <SelectContent>
          {map(workspaces?.data, (workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              <div className="flex justify-start items-center gap-1 font-medium">
                <WorkspaceAvatar
                  image={workspace.imageUrl || ""}
                  name={workspace.name}
                  className="border border-solid-red"
                />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
          {size(workspaces?.data) === 0 && (
            <SelectItem value="empty">
              <div className="flex justify-start items-center gap-1 font-medium">
                <span className="truncate">Nenhum workspace encontrado</span>
              </div>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
