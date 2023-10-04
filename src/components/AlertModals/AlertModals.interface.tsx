export interface ModelPropsI {
  message: string;
  type: string;
  open: boolean;
  handleClose: (value: boolean) => void;
  handleSubmit: () => void;
}
