export interface CommonDrawerPropsI {
  isDrawerOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  okText: string;
  isOk: boolean;
  cancelText?: string;
  footer?: boolean;
  submitHandler?: () => void;
  footerActionText?: string;
  footerActionTextIcon?: any;
  onFooterActionSubmit?: () => void;
  isCancel?: boolean;
  isFooterFeature?: boolean;
  isFooterFeatureText?: string;
  isFooterFeatureHandler?: () => void;
  titleIcon?: any;
  isLoading?: boolean;
  headerIcon?: any;
  isDisabled?: boolean;
  cancelBtnHandler?: any;
  variant?: any;
}
