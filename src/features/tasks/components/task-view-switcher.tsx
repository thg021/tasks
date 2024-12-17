'use client';
import { PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParamProjectId } from '@/features/projects/hooks/use-param-project-id';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useGetTasks } from '../api/use-get-tasks';
import { useCreateTaskModal } from '../hooks/use-create-task-modal';
import { useTasksFilters } from '../hooks/use-tasks-filters';
import { columns } from './columns';
import { DataFilters } from './data-filters';
import { DataTable } from './data-table';

export const TaskViewSwitcher = () => {
  const [view, setView] = useQueryState('task-view', {
    defaultValue: 'table'
  });
  const [{ status, projectId, dueDate, assignedId }] = useTasksFilters();

  const { open } = useCreateTaskModal();
  const workspaceId = useWorkspaceId();
  const projectIdParam = useParamProjectId();
  const { data: result } = useGetTasks({
    workspaceId,
    projectId: projectIdParam ?? projectId,
    status: status ?? undefined,
    assignedId: assignedId ?? undefined,
    dueDate: dueDate ?? undefined
  });

  return (
    <Tabs defaultValue={view} onValueChange={setView} className="w-full flex-1 rounded-lg border">
      <div className="flex h-full flex-col overflow-auto p-4">
        <div className="flex flex-col items-center justify-between gap-y-2 lg:flex-row">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Tabela
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendário
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto" onClick={open}>
            <PlusIcon className="sizes-4 mr-2" />
            Novo
          </Button>
        </div>
        <Separator className="my-4" />
        <DataFilters />
        <Separator className="my-4" />
        <>
          <TabsContent className="mt-0" value="table">
            <DataTable columns={columns} data={result?.data.tasks || []} />
          </TabsContent>
          <TabsContent className="mt-0" value="kanban">
            kanban
          </TabsContent>
          <TabsContent className="mt-0" value="calendar">
            Calendario
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};
