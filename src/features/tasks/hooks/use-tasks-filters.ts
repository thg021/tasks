import { parseAsString, parseAsStringEnum, useQueryStates } from 'nuqs';
import { TaskStatus } from '../types';

export const useTasksFilters = () => {
  return useQueryStates({
    projectId: parseAsString,
    status: parseAsStringEnum(Object.values(TaskStatus)),
    assignedId: parseAsString,
    dueDate: parseAsString,
    search: parseAsString
  });
};
