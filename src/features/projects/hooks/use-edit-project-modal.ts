import { parseAsBoolean, useQueryState } from 'nuqs';
export const useEditProjectModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    'edit-project',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen
  };
};
