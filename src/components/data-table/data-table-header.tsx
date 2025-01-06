import { map } from 'lodash';
import { useDataTable } from '@/providers/data-table-provider';
import { flexRender } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '../ui/table';

export function DataTableHeader() {
  const { table } = useDataTable();

  return (
    <TableHeader>
      {map(table.getHeaderGroups(), (headerGroup) => (
        <TableRow key={headerGroup.id}>
          {map(headerGroup.headers, (header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
