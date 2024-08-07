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
  setLimit: (limit: number) => void;
  searchBy: string;
  setSearchBy: (value: string) => void;
  setPage: (page: number) => void;
}
