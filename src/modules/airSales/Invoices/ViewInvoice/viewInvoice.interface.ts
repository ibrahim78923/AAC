export interface RowI {
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  _id: string;
}

export interface InfoI {
  cell: {
    row: {
      original: RowI;
    };
  };
  getValue: () => any;
}

export interface Column {
  accessorFn: (row: RowI) => any;
  id: string;
  header: string;
  isSortable: boolean;
  cell: (info: InfoI) => JSX.Element | string;
}

export interface ProductI {
  unitPrice: number;
  quantity: number;
  unitDiscount: number;
}

export interface DetailI {
  title: string;
  value: string | number;
}
