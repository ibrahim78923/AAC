export interface ModelPropsI {
  message: string;
  type: string;
  open: boolean | string;
  handleClose: (value: boolean | string) => void;
  handleSubmit: () => void;
}
