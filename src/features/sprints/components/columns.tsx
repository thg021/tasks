'use client';

import { ArrowUpDown, MoreVerticalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskActions } from '@/features/tasks/components/task-actions';
import { ColumnDef } from '@tanstack/react-table';

export type Sprint = {
  projectId: string | null;
  status: number;
  name: string;
  id: string;
  workspaceId: string | null;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  totalStoryPoints: number;
};

export const columns: ColumnDef<Sprint>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Sprint
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return <div className="flex items-center justify-start">{name}</div>;
    }
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          inicio
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateStart = new Date(row.original.startDate).toLocaleDateString('pt-BR');
      return <div className="flex items-center gap-x-2 text-sm font-medium">{dateStart}</div>;
    }
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          fim
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const endDate = new Date(row.original.endDate).toLocaleDateString('pt-BR');

      return <div className="flex items-center gap-x-2 text-sm font-medium">{endDate}</div>;
    }
  },
  {
    accessorKey: 'totalStoryPoints',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          prazo
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const totalStoryPoints = row.original.totalStoryPoints;
      return <p>{totalStoryPoints}</p>;
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          status
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      const statusMap: Record<number, string> = {
        0: 'Novo',
        1: 'Em progresso',
        2: 'Concluído'
      };
      return <p>{statusMap[status]}</p>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <TaskActions id={id}>
          <Button variant="ghost">
            <MoreVerticalIcon className="size-4" />
          </Button>
        </TaskActions>
      );
    }
  }
];
