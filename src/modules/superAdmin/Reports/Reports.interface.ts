export interface InvoiceReport {
  week?: string | number;
  month?: string | number;
  paid: number;
  followUpNow: number;
  followUpSoon: number;
  name: string;
  data: string[];
}

export interface InvoicesAnalystGraphProps {
  invoicesReportsGraph: InvoiceReport[];
  filter: {
    month?: string;
    clients?: string[];
  };
  setFilter: (filter: { month?: string; clients?: string[] }) => void;
  resetFilters: () => void;
  isLoading: boolean;
}

export interface RowInterface {
  owner: {
    avatar: {
      url: string;
    };
    firstName: string;
    lastName: string;
    email: string;
  };
  products: {
    name: string;
  };
  planType: {
    name: string;
  };
  details: {
    plans: {
      planPrice: number;
    };
    invoiceNo: number;
  };
  invoiceNo: number;
  dueDate: string;
  total: number;
  status: string;
}

interface GraphDataItem {
  count: number;
  product: string;
  month: number;
}

interface UserReportsGraphData {
  data: GraphDataItem[];
}

export interface ProductWiseGraphProps {
  usersReportsGraphData: UserReportsGraphData;
}
