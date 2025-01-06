import { Button } from '@/components/ui/button';
import { useDataTable } from '@/providers/data-table-provider';

export function DataTablePagination() {
  const { table } = useDataTable();

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Anterior
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Próximo
      </Button>
    </div>
  );
}
