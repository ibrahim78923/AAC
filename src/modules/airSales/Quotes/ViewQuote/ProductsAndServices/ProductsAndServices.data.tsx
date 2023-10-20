export const columns: any = [
  {
    accessorFn: (row: any) => row.productName,
    id: 'productName',
    cell: (info: any) => info.getValue(),
    header: 'Product Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.unitPrice,
    id: 'unitPrice',
    isSortable: true,
    header: 'Unit Price',
    cell: (info: any) => <>£{info.getValue()}</>,
  },
  {
    accessorFn: (row: any) => row.quantity,
    id: 'quantity',
    isSortable: true,
    header: 'Quantity',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.totalPrice,
    id: 'totalPrice',
    isSortable: true,
    header: 'Total Price',
    cell: (info: any) => <>£{info.getValue()}</>,
  },
];
