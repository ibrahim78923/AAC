export interface DeleteSalesWorkflowI {
  deleteWorkflow: boolean;
  setDeleteWorkflow: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  loading: boolean;
}
