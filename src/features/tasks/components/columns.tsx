'use client';

import { differenceInDays } from 'date-fns';
import { ArrowUpDown, MoreVerticalIcon, Square } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';
import { getTextColor } from '@/lib/get-text-color';
import { snakeCaseToTitleCase } from '@/lib/snake-case-to-title-case';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import type { Task } from '../types';
import { TaskActions } from './task-actions';
import { TaskDate } from './task-date';

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          Nome task
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      const dueDate = row.original.dueDate;
      const today = new Date();
      const endDate = dueDate ? new Date(dueDate) : new Date();
      const diffInDays = differenceInDays(endDate, today);
      const textColor = getTextColor(diffInDays);
      return (
        <div className="flex items-center justify-start">
          {dueDate && <Square className={cn('mr-2 size-2')} stroke="0" fill={textColor} />}
          <p className="line-clamp-1">{name}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'project',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          projeto
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const project = row.original.project;
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <ProjectAvatar name={project.name} className="size-6" isActive={false} />
          <p className="line-clamp-1">{project.name}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'assignedId',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          responsável
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const assigned = row.original.userAssigned;

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          {assigned && (
            <ProjectAvatar name={assigned?.user?.name || ''} className="size-6" isActive={false} />
          )}
          <p className="line-clamp-1">{assigned?.user?.name || ''}</p>
        </div>
      );
    }
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
          prazo
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;

      return dueDate && <TaskDate value={dueDate} />;
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
      const status = snakeCaseToTitleCase(row.original.status);

      return <Badge>{status}</Badge>;
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
