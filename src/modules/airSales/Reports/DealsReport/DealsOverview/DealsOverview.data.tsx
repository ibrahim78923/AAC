export const columns: any = [
  {
    accessorFn: (row: any) => row.dealName,
    id: 'dealName',
    cell: (info: any) => info.getValue(),
    header: 'Deal Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row.owner,
    id: 'owner',
    isSortable: true,
    header: 'Owner',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.piplelineStage,
    id: 'piplelineStage',
    isSortable: true,
    header: 'Deal Pipeline Stage',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.closeDate,
    id: 'closeDate',
    isSortable: true,
    header: 'Deal Close Date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.amount,
    id: 'amount',
    isSortable: true,
    header: 'Amount',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info.getValue(),
  },
];
