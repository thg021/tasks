'use client';
import { ResponsiveModal } from '@/components/responsive-modal';
import { useEditProjectModal } from '@/features/projects/hooks/use-edit-project-modal';
import { EditProjectForm } from './edit-project-form';

export const EditProjectModal = () => {
  const { isOpen, setIsOpen, close } = useEditProjectModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <EditProjectForm onCancel={close} />
    </ResponsiveModal>
  );
};
