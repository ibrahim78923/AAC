import { SxProps, Theme } from '@mui/system';
import { ReactNode } from 'react';

export type ButtonColorI =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export type ButtonVariantI = 'text' | 'outlined' | 'contained';

export type ButtonSizeI = 'small' | 'medium' | 'large';

export type ButtonTypeI = 'submit' | 'button' | 'reset';

export type ButtonIconTypeI =
  | 'circle'
  | 'square'
  | 'filter'
  | 'restore'
  | 'restore'
  | 'success'
  | 'reject';

export interface AddNewItemButtonPropsI {
  disabled?: boolean;
  variant?: ButtonVariantI;
  name?: string;
  color?: ButtonColorI;
  onClick?: () => void;
  hasStartIcon?: boolean;
  hasEndIcon?: boolean;
  iconType?: ButtonIconTypeI;
  size?: ButtonSizeI;
  customStyles?: SxProps<Theme>;
}

export interface ApiPollingButtonPropsI {
  onClick: () => void;
  showLoader: boolean;
  variant?: ButtonVariantI;
  isSmall?: boolean;
  customStyles?: SxProps<Theme>;
  isFetching: boolean;
  fulfilledTimeStamp?: number;
  intervalTime: number;
}

export interface CustomButtonPropsI {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariantI;
  color?: ButtonColorI;
  iconType?: ButtonIconTypeI;
  hasIcon?: boolean;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  customStyles?: any | SxProps<Theme>;
  type?: ButtonTypeI;
  primary?: boolean;
}

export interface CustomIconButtonPropsI {
  onClick: () => void;
  color?: ButtonColorI;
  customStyles?: SxProps<Theme>;
  children: ReactNode;
  hasIcon?: boolean;
  disabled?: boolean;
  iconType?: string;
  size?: ButtonSizeI;
  type?: ButtonTypeI;
}

export interface CustomLoadingButtonPropsI {
  onClick?: (...arg: any) => void;
  children: ReactNode;
  color?: ButtonColorI;
  customStyles?: any | SxProps<Theme>;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSizeI;
  type?: ButtonTypeI;
  variant?: ButtonVariantI;
  className?: string;
  primary?: boolean;
  fullWidth?: boolean;
  startIcon?: null | ReactNode;
}

export interface DownloadButtonPropsI {
  color?: ButtonColorI;
  disabled?: boolean;
  hasStyles?: boolean;
  variant?: ButtonVariantI;
  children?: ReactNode;
  downloadRef?: any;
  downloadFileType?: string;
}

export interface InteractiveButtonPropsI {
  color?: ButtonColorI;
  variant?: ButtonVariantI;
  children?: ReactNode;
  customStyles?: SxProps<Theme>;
  onClick: () => void;
}

export interface LinkButtonPropsI {
  color?: ButtonColorI;
  variant?: ButtonVariantI;
  link?: string;
  name: string;
}

export interface ExportButtonPropsI {
  handleCsvExport: () => void;
  handleExcelExport: () => void;
  btnVariant?: ButtonVariantI;
  btnText?: string;
}

export interface ActionsLoadingButtonPropsI {
  handleSubmitButton?: any;
  handleCancelButton?: any;
  cancelButtonText?: string;
  submitButtonText?: string;
  showSubmitLoader?: boolean;
  disabledSubmitButton?: boolean;
  disabledCancelButton?: boolean;
  hasBorder?: boolean;
  justifyContent?: string;
  primary?: boolean;
}
