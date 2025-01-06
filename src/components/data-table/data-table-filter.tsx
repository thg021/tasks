import { Input } from '@/components/ui/input';
import { useDataTable } from '@/providers/data-table-provider';

export function DataTableFilter({ columnId }: { columnId: string }) {
  const { table } = useDataTable();

  return (
    <Input
      placeholder={`Filtrar ${columnId}...`}
      value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ''}
      onChange={(event) => table.getColumn(columnId)?.setFilterValue(event.target.value)}
      className="max-w-xs"
    />
  );
}
