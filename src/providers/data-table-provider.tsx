import { createContext, useContext } from 'react';
import { type Table as ReactTable } from '@tanstack/react-table';

interface DataTableContextValue<TData> {
  table: ReactTable<TData>;
}

export const DataTableContext = createContext<DataTableContextValue<any> | undefined>(undefined);

export function useDataTable<TData>() {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error('useDataTable must be used within a DataTableProvider');
  }
  return context as DataTableContextValue<TData>;
}
