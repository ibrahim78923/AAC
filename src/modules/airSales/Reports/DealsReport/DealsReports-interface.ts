export interface DealsOverviewProps {
  dealsReportsTable: {
    deals: any[];
    meta: {
      pages: number;
      limit: number;
      total: number;
      page: number;
    };
  };
  setLimit: (limit: any) => void;
  setSearchBy: (value: string) => void;
  setPage: (page: any) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}
