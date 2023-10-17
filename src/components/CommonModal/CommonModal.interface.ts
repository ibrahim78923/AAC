export interface ModelPropsI {
  open: boolean;
  handleClose: (value: boolean) => void;
  handleSubmit: () => void;
  children: any;
  title: string;
  okText: string;
  submitIcon?: any;
  footer?: boolean;
}
