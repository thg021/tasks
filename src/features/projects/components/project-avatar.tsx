import type { HTMLAttributes } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type ProjectAvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  fallbackClassName?: string;
  isActive: boolean;
};

export const ProjectAvatar = ({
  name,
  fallbackClassName,
  className,
  isActive,
  ...rest
}: ProjectAvatarProps) => {
  return (
    <Avatar className={cn('size-8 rounded-md', className)} {...rest}>
      <AvatarFallback
        className={cn(
          'flex items-center justify-center rounded-md bg-neutral-200 text-xs font-semibold text-neutral-500',
          fallbackClassName,
          isActive && 'bg-slate-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
