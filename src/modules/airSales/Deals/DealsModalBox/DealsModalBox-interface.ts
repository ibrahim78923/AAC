export interface AssignModalBoxProps {
  open: boolean;
  onClose: () => void;
  seletedId: string[];
  setSelectedRows: (rows: string[]) => void;
}

export interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  handleSubmitBtn: () => void;
  loading: boolean;
}

export interface ExportRecordModalI {
  open: boolean;
  onClose: () => void;
}
