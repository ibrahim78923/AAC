export interface ExportButtonPropsI {
  handleCsvExport: () => void;
  handleExcelExport: () => void;
  btnVariant?: 'contained' | 'outlined' | 'text';
  btnText?: string;
}
