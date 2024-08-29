export interface ApprovalCardI {
  title: string;
  folder: string;
  author: string;
  sendApproval: () => void;
  disabled: boolean;
  isLoading: boolean;
}
