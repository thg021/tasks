import { parseAsBoolean, useQueryState } from 'nuqs';
export const useCreateMemberModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    'create-member',
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
