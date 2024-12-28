import { parseAsBoolean, useQueryState } from 'nuqs';
export const useAvatarModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    'avatar',
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
