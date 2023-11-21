export interface ModelPropsI {
  open: boolean;
  handleClose?: (value: boolean) => void;
  handleSubmit?: () => void;
  children: any;
  title: string;
  okText?: string;
  cancelText?: string;
  handleCancel?: any;
  submitIcon?: any;
  footer?: boolean;
  footerFill?: any;
  isSubmitDisabled?: any;
  headerIcon?: any;
}
