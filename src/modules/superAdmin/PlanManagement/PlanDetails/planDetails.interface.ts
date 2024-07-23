export interface TableRow {
  id: string;
  planProducts: PlanProduct[];
  planType: {
    name: string;
  };
  description: string;
  createdAt: string;
  isActive: boolean;
  defaultUsers: number;
  planPrice: number;
  defaultStorage: string;
}

export interface PlanProduct {
  name: string;
}

export interface TableColumn {
  accessorFn: (row: TableRow) => any;
  id: string;
  cell?: (info: any) => JSX.Element;
  header: string;
  isSortable: boolean;
}

interface FilterValues {
  productId?: string;
  planTypeId?: string;
  createdAt?: string;
}

export interface PlanDetailsProps {
  getPlanManagementRowData: any;
  searchBy: string;
  filterValues: FilterValues;
}
