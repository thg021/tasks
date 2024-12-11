import { parseAsBoolean, useQueryState } from 'nuqs';
export const useCreateTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    'create-task',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const [isMaximize, setIsMaximize] = useQueryState(
    'maximize',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggleMaximize = () => setIsMaximize(!isMaximize);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
    isMaximize,
    toggleMaximize
  };
};
