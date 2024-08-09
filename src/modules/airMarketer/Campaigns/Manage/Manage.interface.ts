export interface CampaignData {
  data: {
    campaigns: any[];
    meta: {
      pages: number;
      limit: number;
      total: number;
      page: number;
    };
  };
}

interface filtersI {
  campaignStatus: string;
  campaignOwner: {
    id: string;
    name: string;
  };
  startDate?: string;
  endDate?: string;
}

export interface ManageI {
  campaignsData: CampaignData;
  handleResetFilters: () => void;
  filterLoading: boolean;
  selectedRows: string[];
  searchCampaigns: string;
  setSearchCampaigns: (value: string) => void;
  setSelectedRows: (rows: string[]) => void;
  filters: filtersI;
  setFilters: (filters: filtersI) => void;
  setPage: (page: number) => void;
  setPageLimit: (limit: number) => void;
  setIsActionsDisabled: (disabled: boolean) => void;
  setcheckedColumns: (columns: string[]) => void;
  setRowId: (id: string) => void;
}
