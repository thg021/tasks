'use client';
import { signOut } from 'next-auth/react';
import { Loader, LogOutIcon } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useCurrent } from '@/features/auth/api/use-current';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
export const UserButton = () => {
  const { data: user, isLoading } = useCurrent();
  const onSignOut = () => signOut({ redirectTo: '/sign-in' });

  if (isLoading) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200">
        <Loader className="size-4 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const { name, email } = user;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email?.charAt(0).toUpperCase() ?? 'T';
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 cursor-pointer border border-neutral-300 transition hover:opacity-70">
          <AvatarFallback className="flex w-full items-center justify-center bg-neutral-200 font-medium text-neutral-500">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-10 cursor-pointer border border-neutral-300 transition hover:opacity-70">
            <AvatarFallback className="flex w-full items-center justify-center bg-neutral-200 font-medium text-neutral-500">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-neutral-700">{name}</p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <Separator className="mt-1" />
        <DropdownMenuItem
          onClick={onSignOut}
          className="flex h-10 cursor-pointer items-center text-rose-600"
        >
          <LogOutIcon className="mr-2 size-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
