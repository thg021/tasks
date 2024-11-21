"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { MemberAvatar } from "./member-avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data: members, isLoading } = useGetMembers(workspaceId);
  return (
    <Card className="size-full border border-zinc-300 shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Equipe</CardTitle>
      </CardHeader>
      <div className=" px-7 ">
        <Separator />
      </div>
      <CardContent className="flex flex-col space-y-4 py-4">
        {isLoading && <p>Carregando...</p>}
        {members?.data.map((member, index) => (
          <>
            <div key={member.id} className="flex items-center gap-2">
              <MemberAvatar
                name={member.name}
                className="size-8"
                fallbackClassName="text-lg"
              />

              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <div className="flex gap-2 items-center ml-auto">
                {member.role === "ADMIN" && (
                  <span className="ml-auto text-xs bg-emerald-300 py-1 px-2 text-emerald-900 rounded-md">
                    Adiministrador
                  </span>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <MoreHorizontal className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem
                      className="font-medium"
                      onClick={() => {}}
                      disabled={false}
                    >
                      Adm
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium"
                      onClick={() => {}}
                      disabled={false}
                    >
                      Membro
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium"
                      onClick={() => {}}
                      disabled={false}
                    >
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="font-medium text-red-500"
                      onClick={() => {}}
                      disabled={false}
                    >
                      Remover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {index < members.data.length - 1 && <Separator />}
          </>
        ))}
      </CardContent>
    </Card>
  );
};
