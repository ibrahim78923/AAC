export interface SalesWorkflowSubHeaderI {
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  salesWorkflowActionDropdown: {
    id: number;
    title: string;
    permissionKey: string[];
    handleClick: (closeMenu: () => void) => void;
  }[];
  handleSearch: (searchValue: string) => void;
  disabledActionButton: boolean;
  onSubmit: (data: { status: string; createdBy: any; type: string }) => void;
  loading: boolean;
  handleWorkflow: () => Promise<void>;
}
