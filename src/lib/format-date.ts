import { format, isValid } from 'date-fns';

type FormatDateOptions = { pattern?: string };

export const formatDate = (value: Date | string, options?: FormatDateOptions): string => {
  const { pattern = 'dd/MM/yyyy' } = options || {};
  let date: Date;

  if (typeof value === 'string') {
    date = new Date(value);
    if (!isValid(date)) return 'Invalid date string format';
  } else {
    date = value;
  }

  if (!isValid(date)) return 'Invalid date object';
  return format(date, pattern);
};
