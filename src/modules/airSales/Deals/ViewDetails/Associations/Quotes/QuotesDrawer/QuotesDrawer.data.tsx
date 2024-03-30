export const columns: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.row?.original?.name,
    header: 'Product Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.unitPrice,
    id: 'unitPrice',
    isSortable: true,
    header: 'Unit Price',
    cell: (info: any) => <>£{info?.getValue()}</>,
  },
  {
    accessorFn: (row: any) => row?.quantity,
    id: 'quantity',
    isSortable: true,
    header: 'Quantity',
    cell: (info: any) => info?.getValue(),
  },
  // {
  //   accessorFn: (row: any) => row?.purchasePrice,
  //   id: 'purchasePrice',
  //   isSortable: true,
  //   header: 'Total Price',
  //   cell: (info: any) => <>£{info?.getValue()}</>,
  // },
  {
    accessorFn: ({ _id }: { _id: string }) => _id,
    id: '_id',
    isSortable: true,
    header: 'Total Price',
    cell: ({ row: { original } }: any) => (
      <>£{original?.unitPrice * original?.quantity}</>
    ),
  },
];
export const data = {};
