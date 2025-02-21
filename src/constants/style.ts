import { pxToRem } from '@/utils/getFontValue';
import { AVATAR_VARIANTS } from './mui-constant';

export const BORDER_RADIUS = {
  '10px': '10px',
  '0 10px 10px 0': '0 10px 10px 0',
  '0': '0',
};
export const MARGIN = {
  '-4px': '-4px',
  '0': '0',
};

export const FLEX_DIRECTION = {
  ROW: 'row',
  COLUMN: 'column',
  ROW_REVERSE: 'row-reverse',
};

export const AVATAR_VARIANTS_BORDER_RADIUS = {
  [AVATAR_VARIANTS?.CIRCULAR]: '50%',
  [AVATAR_VARIANTS?.ROUNDED]: pxToRem(4),
  [AVATAR_VARIANTS?.SQUARE]: pxToRem(1),
};
