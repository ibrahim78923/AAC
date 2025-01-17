export interface RowI {
  _id: string;
  invoiceNo: string;
  quote?: {
    deal?: {
      amount: number;
    };
    name: string;
  };
  status: string;
  preparedBy?: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  total: number;
}

export interface InfoI {
  cell: {
    row: {
      original: RowI;
    };
  };
  getValue: () => any;
  table: {
    options: {
      data: RowI[];
    };
  };
}

export interface ColumnI {
  accessorFn: (row: RowI) => any;
  id: string;
  cell: (info: InfoI) => JSX.Element | string;
  header: string | ((info: InfoI) => JSX.Element);
  isSortable: boolean;
}
