export interface ModelPropsI {
  open: boolean;
  handleClose?: (value: boolean) => void;
  handleSubmit?: () => void;
  children: any;
  title: React.ReactNode;
  okText?: string;
  cancelText?: string;
  handleCancel?: any;
  submitIcon?: any;
  footer?: boolean;
  footerFill?: any;
  isLoading?: boolean;
  isSubmitDisabled?: any;
  headerIcon?: any;
}
