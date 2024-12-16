import { formatDate } from '@/lib/format-date';
import { cn } from '@/lib/utils';

type TaskDateProps = {
  value: string;
  className?: string;
};

export const TaskDate = ({ value, className }: TaskDateProps) => {
  const dateFormatted = formatDate(value);
  return (
    <div className="">
      <span className={cn('truncate', className)}>{dateFormatted}</span>
    </div>
  );
};
