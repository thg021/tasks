import { memo, type HTMLAttributes } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type MemberAvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  fallbackClassName?: string;
};

/**
 * MemberAvatar: Renders an avatar with a fallback containing the user's initials.
 * @param name - The name of the user (required).
 * @param fallbackClassName - Optional className for the fallback element.
 * @param className - Optional className for the Avatar container.
 */
export const MemberAvatarBase = ({
  name,
  fallbackClassName,
  className,
  ...rest
}: MemberAvatarProps) => {
  if (!name) return null;
  const fallbackInitial = name?.charAt(0).toUpperCase() || '?';

  return (
    <Avatar
      aria-label={`Avatar for ${name}`}
      className={cn('border border-neutral-200 size-8 rounded-md', className)}
      {...rest}
    >
      <AvatarFallback
        className={cn(
          'text-neutral-500 bg-neutral-200 flex justify-center items-center font-semibold text-xs rounded-md',
          fallbackClassName
        )}
      >
        {fallbackInitial}
      </AvatarFallback>
    </Avatar>
  );
};

export const MemberAvatar = memo(MemberAvatarBase);
