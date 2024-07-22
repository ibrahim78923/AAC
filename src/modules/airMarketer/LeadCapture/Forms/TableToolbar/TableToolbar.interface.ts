export interface ToolbarI {
  status: string;
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
