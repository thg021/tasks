"use client";
import { Avatar } from "@/components/ui/avatar";
import { useCurrent } from "../api/use-current";
import { Loader, LogOutIcon } from "lucide-react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useLogout } from "../api/use-logout";
export const UserButton = () => {
  const { data: user, isLoading } = useCurrent();
  const { mutate: logout } = useLogout();
  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="size-4 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const { name, email } = user.data;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email?.charAt(0).toUpperCase() ?? "T";
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-70 cursor-pointer transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 w-full font-medium text-neutral-500 flex items-center justify-center">
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
        <div className="flex items-center flex-col justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-10 hover:opacity-70 cursor-pointer transition border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 w-full font-medium text-neutral-500 flex items-center justify-center">
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
          onClick={() => logout()}
          className="h-10 flex cursor-pointer items-center text-rose-600"
        >
          <LogOutIcon className="size-4 mr-2" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
