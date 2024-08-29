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
  searchBy: string;
  setSearchBy: (value: string) => void;
  setPage: (page: any) => void;
}
