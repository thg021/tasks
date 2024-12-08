'use client';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { MemberAvatar } from './member-avatar';
import MembersListLoading from './members-list-loading';

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data: members, isLoading } = useGetMembers(workspaceId);
  return (
    <Card className="size-full border border-zinc-300 shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Equipe</CardTitle>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="flex flex-col space-y-4 py-4">
        {isLoading && <MembersListLoading />}
        {members?.data.map((member, index) => (
          <>
            <div key={member.id} className="flex items-center gap-2">
              <MemberAvatar name={member.name} className="size-8" fallbackClassName="text-lg" />

              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {member.role === 'ADMIN' && (
                  <span className="ml-auto rounded-md bg-emerald-300 px-2 py-1 text-xs text-emerald-900">
                    Administrador
                  </span>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <MoreHorizontal className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem className="font-medium" onClick={() => {}} disabled={false}>
                      Adm
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-medium" onClick={() => {}} disabled={false}>
                      Membro
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-medium" onClick={() => {}} disabled={false}>
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
