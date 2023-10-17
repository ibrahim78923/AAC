// products table data
export const productsTableColumns: any = [
  {
    accessorFn: (row: any) => row.Sr,
    id: 'Sr',
    cell: (info: any) => info.getValue(),
    header: 'Sr#',
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.productName,
    id: 'productName',
    cell: (info: any) => info.getValue(),
    header: 'Product Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.description,
    id: 'description',
    isSortable: true,
    header: 'Description',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.quantity,
    id: 'quantity',
    isSortable: true,
    header: 'Quantity',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.unitPrice,
    id: 'unitPrice',
    isSortable: true,
    header: 'Unit Price',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.totalPrice,
    id: 'totalPrice',
    isSortable: true,
    header: 'Total Price',
    cell: (info: any) => info.getValue(),
  },
];

// products table data
export const productsTableData: any = [
  {
    Sr: '1',
    productName: 'NADSSP - 16',
    unitPrice: '£ 40',
    quantity: '1',
    description: 'gbp',
    totalPrice: '£ 40',
  },
  {
    Sr: '2',
    productName: 'NADSSP - 19',
    unitPrice: '£ 61',
    quantity: '1',
    description: '%',
    totalPrice: '£ 60',
  },
];
