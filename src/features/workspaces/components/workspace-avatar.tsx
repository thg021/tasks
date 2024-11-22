import type { HTMLAttributes } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type WorkspaceAvatarProps = HTMLAttributes<HTMLDivElement> & {
  image?: string;
  name: string;
};

export const WorkspaceAvatar = ({
  name,
  image,
  className,
  ...rest
}: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn(
          'size-10 relative rounded-md overflow-hidden ',
          className
        )}
        {...rest}
      >
        <Image
          src={image}
          alt={name}
          width={32}
          height={32}
          className="object-center"
        />
      </div>
    );
  }
  return (
    <Avatar className={cn('size-8 rounded-md', className)}>
      <AvatarFallback className="rounded-md bg-blue-600 text-xs font-semibold text-white">
        {name.substring(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
};
