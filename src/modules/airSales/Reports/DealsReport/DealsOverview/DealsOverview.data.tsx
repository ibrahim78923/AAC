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
    accessorFn: (row: any) => row.phoneNo,
    id: 'phoneNo',
    isSortable: true,
    header: 'Deal Pipeline Stage',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.address,
    id: 'address',
    isSortable: true,
    header: 'Deal Close Date',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.status,
    id: 'status',
    isSortable: true,
    header: 'Quotes Name',
    cell: (info: any) => info.getValue(),
  },
];
