'use client';
import { ResponsiveModal } from '@/components/responsive-modal';
import { useAvatarModal } from '../hooks/use-avatar-modal';
import { EditAvatarForm } from './edit-avatar-form';

export const AvatarModal = () => {
  const { isOpen, setIsOpen } = useAvatarModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <EditAvatarForm />
    </ResponsiveModal>
  );
};
