'use client';
import { ResponsiveModal } from '@/components/responsive-modal';
import { useCreateMemberModal } from '../hooks/use-create-member-modal';
import { CreateMemberForm } from './create-member-form';

export const CreateMemberModal = () => {
  const { isOpen, setIsOpen, close, toggleMaximize } = useCreateMemberModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <button
        className='data-[state=open]:text-muted-foreground" absolute right-12 top-4 rounded-sm border-none p-0 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent'
        onClick={toggleMaximize}
      ></button>
      <CreateMemberForm onCancel={close} />
    </ResponsiveModal>
  );
};
