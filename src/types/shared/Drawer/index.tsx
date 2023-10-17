export interface CommonDrawerPropsI {
  isDrawerOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  okText: string;
  isOk: boolean;
  cancelText?: string;
  footer?: boolean;
  submitHandler?: () => void;
  footerActionText?: string;
  footerActionTextIcon?: any;
  onFooterActionSubmit?: () => void;
}
