import { find } from 'lodash';

type Color = '#ef4444' | '#047857' | '#f59e0b';
type ColorMapping = {
  maxDays: number;
  color: Color;
};

const COLORS: Record<'DEFAULT' | 'RED' | 'YELLOW', Color> = {
  DEFAULT: '#047857',
  RED: '#ef4444',
  YELLOW: '#f59e0b'
};

const colorMapping: ColorMapping[] = [
  { maxDays: -1, color: COLORS.RED },
  { maxDays: 3, color: COLORS.YELLOW }
];

export const getTextColor = (diffInDays: number): Color =>
  find(colorMapping, ({ maxDays }) => diffInDays <= maxDays)?.color || COLORS.DEFAULT;
