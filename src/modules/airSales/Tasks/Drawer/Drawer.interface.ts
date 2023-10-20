export interface TaskDrawerI {
  defaultOpen?: boolean;
  title?: string;
  children?: React.ReactNode;
  btnTitle?: string;
  btnIcon?: React.ReactNode;
  submitHandler?: () => void;
  isOk?: boolean;
  okText?: string;
  btnVariant?: 'outlined' | 'contained';
  footer?: boolean;
  hideBtn?: boolean;
}
