export interface SalesWorkflowSubHeaderI {
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  salesWorkflowActionDropdown: {
    id: number;
    title: string;
    permissionKey: string[];
    handleClick: (closeMenu: () => void) => void;
  }[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  disabledActionButton: boolean;
  onSubmit: (data: { status: string; createdBy: any; type: string }) => void;
  loading: boolean;
  handleWorkflow: () => Promise<void>;
}
