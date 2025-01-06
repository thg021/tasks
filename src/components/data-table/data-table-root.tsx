'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { DataTableContext } from '@/providers/data-table-provider';
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState
} from '@tanstack/react-table';
interface DataTableRootProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  children: ReactNode;
}

export function DataTableRoot<TData, TValue>({
  columns,
  data,
  children
}: DataTableRootProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters
    }
  });

  if (!isMounted) {
    return <>Carregando</>;
  }

  return (
    <DataTableContext.Provider value={{ table }}>
      <div className="flex flex-col gap-y-4">{children}</div>
    </DataTableContext.Provider>
  );
}
