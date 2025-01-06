import type { ReactNode } from 'react';
import { Table } from '@/components/ui/table';

type DataTableContainerProps = {
  children: ReactNode;
};
export const DataTableContainer = ({ children }: DataTableContainerProps) => {
  return <Table>{children}</Table>;
};
