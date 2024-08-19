export interface AlertModalsPropsI {
  message: string;
  type: string;
  open: boolean;
  handleClose: () => void;
  handleSubmitBtn: () => void;
  disableCancelBtn?: boolean;
  handleCancelBtn?: () => void;
  loading: boolean;
  cancelBtnText?: string;
  submitBtnText?: string;
  typeImage?: any;
  isDisableSubmitBtn?: boolean;
  footer?: boolean;
}
