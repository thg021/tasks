import type { HTMLAttributes } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

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
    <Avatar className={cn('size-8 rounded-md border border-neutral-200', className)} {...rest}>
      <AvatarFallback
        className={cn(
          'flex items-center justify-center rounded-md bg-neutral-200 text-xs font-semibold text-neutral-500',
          fallbackClassName
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
