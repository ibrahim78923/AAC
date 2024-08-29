export interface ExportModalPropsI {
  open: boolean;
  onSubmit: (exportType: string) => void;
  handleClose: () => void;
}
