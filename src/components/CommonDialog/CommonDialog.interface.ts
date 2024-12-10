import { DialogProps } from '@mui/material/Dialog';

export interface CommonDialogProps extends DialogProps {
  width?: string;
  dialogTitle?: React.ReactNode;
  closeIcon?: boolean;
  onSubmit?: () => void;
  okText?: string;
  cancelText?: string;
  isLoading?: boolean;
  renderFooter?: React.ReactNode;
  isFooter?: boolean;
  children?: React.ReactNode;
}
