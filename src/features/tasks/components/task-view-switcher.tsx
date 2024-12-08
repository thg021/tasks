'use client';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreateTaskModal } from '../hooks/use-create-task-modal';

export const TaskViewSwitcher = () => {
  const { open } = useCreateTaskModal();
  return (
    <Tabs className="w-full flex-1 rounded-lg border">
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
        {/* TODO: filtros */}
        <Separator className="my-4" />
        <>
          <TabsContent className="mt-0" value="table">
            Tabela
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
