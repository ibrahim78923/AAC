export interface ExportModalPropsI {
  open: boolean;
  onSubmit: (exportType: string) => void;
  handleClose: () => void;
  disableCancelBtn?: boolean;
  loading?: boolean;
  isDisableSubmitBtn?: boolean;
}
