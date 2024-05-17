export interface ToolbarI {
  setSearchBy: (value: any) => void;
  disabledActions: boolean;
  disabledMenuItem: boolean;
  onClickViewDetails: () => void;
  onClickEdit: () => void;
  onClickDelete: () => void;
  onClickExport: () => void;
  onClickSendEmail: () => void;
  onClickRestore: () => void;
}
