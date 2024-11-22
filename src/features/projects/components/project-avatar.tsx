import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { HTMLAttributes } from "react";

type ProjectAvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  fallbackClassName?: string;
};

export const ProjectAvatar = ({
  name,
  fallbackClassName,
  className,
  ...rest
}: ProjectAvatarProps) => {
  return (
    <Avatar
      className={cn("border border-neutral-200 size-8 rounded-md", className)}
    >
      <AvatarFallback
        className={cn(
          "text-neutral-500 bg-neutral-200 flex justify-center items-center font-semibold text-xs rounded-md",
          fallbackClassName
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
