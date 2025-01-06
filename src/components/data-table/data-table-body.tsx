import { map } from 'lodash';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useDataTable } from '@/providers/data-table-provider';
import { flexRender } from '@tanstack/react-table';

type DataTableBody = {
  emptyText?: string;
};
export function DataTableBody<TData>({ emptyText = 'Nenhum dado encontrado' }: DataTableBody) {
  const { table } = useDataTable<TData>();

  return (
    <TableBody>
      {table.getRowModel().rows.length > 0 ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {map(row.getVisibleCells(), (cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={table.getAllColumns().length} className="text-center">
            {emptyText}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
