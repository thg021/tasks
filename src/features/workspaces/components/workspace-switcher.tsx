"use client";
import { Loader } from "lucide-react";
import { useGetWorkspaces } from "../api/use-get-workspaces";
import { RiAddCircleFill } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { map } from "lodash";
import { WorkspaceAvatar } from "./workspace-avatar";
export const WorkspaceSwitcher = () => {
  const { data: workspaces, isLoading } = useGetWorkspaces();

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
        <RiAddCircleFill className="size-5 text-neutral-500 cursor-pointer hover:opacity-70 transition" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="Selecione um workspace" />
        </SelectTrigger>
        <SelectContent>
          {map(workspaces?.data, (workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex justify-start items-center gap-1 font-medium">
                <WorkspaceAvatar
                  image={workspace.imageUrl}
                  name={workspace.name}
                  className="border border-solid-red"
                />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
          {workspaces?.data?.length === 0 && (
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
