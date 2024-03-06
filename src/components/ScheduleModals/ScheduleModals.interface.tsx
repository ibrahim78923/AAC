export interface ModelPropsI {
  message?: string;
  type: string;
  open: boolean;
  handleClose: (value: boolean) => void;
  handleSubmit: () => void;
  children?: React.ReactNode;
  submitButonText: string;
  isFooter?: boolean;
  loading?: boolean;
}
