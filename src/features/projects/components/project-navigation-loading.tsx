import { Skeleton } from '@/components/ui/skeleton';

export const ProjectNavigationLoading = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-7">
      <Skeleton className="h-4 w-full" />
      <div className="flex w-full flex-col gap-y-5">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
};
