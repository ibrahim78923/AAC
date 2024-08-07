export interface FilterSalesWorkflowI {
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  onSubmit: (data: { status: string; createdBy: any; type: string }) => void;
  handleWorkflow: () => Promise<void>;
}
