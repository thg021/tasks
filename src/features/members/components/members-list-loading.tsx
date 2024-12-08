import { Skeleton } from '@/components/ui/skeleton';

const MembersListLoading = () => {
  return (
    <div className="flex w-full items-center gap-2">
      <Skeleton className="size-8" />
      <div className="flex flex-col gap-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-2 w-40" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Skeleton className="h-6 w-40" />
      </div>
    </div>
  );
};

export default MembersListLoading;
