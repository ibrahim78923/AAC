export interface CommonDrawerPropsI {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  okText?: string;
  isOk?: boolean;
  submitHandler?: () => void;
}
