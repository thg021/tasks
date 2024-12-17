'use client';
import { Maximize, Minimize } from 'lucide-react';
import { ResponsiveModal } from '@/components/responsive-modal';
import { useEditTaskModal } from '../hooks/use-edit-task-modal';
import { EditTaskWrapper } from './edit-task-wrapper';

export const EditTaskModal = () => {
  const { taskId, close, isMaximize, toggleMaximize } = useEditTaskModal();
  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close} maximize={isMaximize}>
      <button
        className='data-[state=open]:text-muted-foreground" absolute right-12 top-4 rounded-sm border-none p-0 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent'
        onClick={toggleMaximize}
      >
        {isMaximize ? (
          <Minimize className="size-4 transition-all" />
        ) : (
          <Maximize className="size-4" />
        )}
      </button>
      {taskId && <EditTaskWrapper id={taskId} />}
    </ResponsiveModal>
  );
};
