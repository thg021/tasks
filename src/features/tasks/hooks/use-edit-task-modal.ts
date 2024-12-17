import { parseAsBoolean, parseAsString, useQueryState } from 'nuqs';
export const useEditTaskModal = () => {
  const [taskId, setTaskId] = useQueryState('edit-task', parseAsString);
  const [isMaximize, setIsMaximize] = useQueryState(
    'maximize',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const open = (id: string) => setTaskId(id);
  const close = () => setTaskId(null);
  const toggleMaximize = () => setIsMaximize(!isMaximize);

  return {
    taskId,
    open,
    close,
    setTaskId,
    isMaximize,
    toggleMaximize
  };
};
