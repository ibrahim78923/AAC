import { ChipProps } from '@mui/material';
import { ReactElement } from 'react';

export interface CustomChipPropsI extends ChipProps {
  size?: 'small' | 'medium';
  label: string | any;
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'default';
  variant?: 'filled' | 'outlined';
  disabled?: boolean;
  customStyles?: Record<string, any>;
  shape?: 'oval' | 'rounded' | 'square';
  borderRadius?: number;
  icon?: ReactElement | any;
  backgroundColor?: string;
  textColor?: string;
  hoverStyles?: Record<string, any>;
  onClick?: () => void;
  isCapital?: boolean;
  fontWeight?: number;
  hoverBackgroundColor?: string;
}

export interface RecordCountChipPropsI {
  isCountLoading?: boolean;
  totalCount?: number;
  recordName?: string;
  color?: string;
  recordNameVariant?: string;
}

export interface TooltipItemsCountChipPropsI {
  data?: any[];
}
