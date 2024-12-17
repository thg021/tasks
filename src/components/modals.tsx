import { CreateProjectModal } from '@/features/projects/components/create-project-modal';
import { EditProjectModal } from '@/features/projects/components/edit-project-modal';
import { CreateTaskModal } from '@/features/tasks/components/create-task-modal';
import { EditTaskModal } from '@/features/tasks/components/edit-task-modal';
import { CreateWorkspaceModal } from '@/features/workspaces/components/create-workspace-modal';

export const Modals = () => {
  return (
    <>
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <EditProjectModal />
      <CreateTaskModal />
      <EditTaskModal />
    </>
  );
};
