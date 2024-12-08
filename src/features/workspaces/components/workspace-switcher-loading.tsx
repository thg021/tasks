import { Skeleton } from '@/components/ui/skeleton';

export const WorkspaceSwitcherLoading = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-5">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
};
