export interface PageTitledHeaderPropsI {
  title: any;
  hasImport?: boolean;
  hasExport?: boolean;
  addTitle?: string;
  handleAction?: () => Promise<void> | void | Promise<boolean>;
  handleExcelExport?: () => Promise<void> | void;
  handleImport?: () => Promise<void> | void;
  handleCsvExport?: () => Promise<void> | void;
  moveBack?: () => Promise<void> | void | Promise<boolean>;
  canMovedBack?: boolean;
  hasStartIcon?: boolean;
  hasEndIcon?: boolean;
  createPermissionKey?: string[];
  exportPermissionKey?: string[];
  importPermissionKey?: string[];
  children?: any;
  disableAddButton?: boolean;
}
