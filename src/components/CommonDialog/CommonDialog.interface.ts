import { DialogProps } from '@mui/material/Dialog';

export interface CommonDialogProps extends Omit<DialogProps, 'title'> {
  title?: React.ReactNode;
  width?: string;
  closeIcon?: boolean;
  onSubmit?: () => void;
  okText?: string;
  cancelText?: string;
  isLoading?: boolean;
  renderFooter?: React.ReactNode;
  isFooter?: boolean;
  children?: React.ReactNode;
}
