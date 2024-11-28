'use client';

import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditProjectModal } from '@/features/projects/hooks/use-edit-project-modal';

export const EditProject = () => {
  const { open } = useEditProjectModal();
  return (
    <Button onClick={open}>
      <PencilIcon />
      <span>Editar projeto</span>
    </Button>
  );
};
