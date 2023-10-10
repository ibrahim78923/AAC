export const columns: any = [
  {
    accessorFn: (row: any) => row.Id,
    id: 'Id',
    cell: (info: any) => info.getValue(),
    header: 'Meeting Name',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row.clientName,
    id: 'clientName',
    cell: (info: any) => info.getValue(),
    header: 'Client Name',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row.productsSuite,
    id: 'productsSuite',
    isSortable: true,
    header: 'Products/Suite',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.planType,
    id: 'planType',
    isSortable: true,
    header: 'Plan Type',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.discount,
    id: 'discount',
    isSortable: true,
    header: 'Discount',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.defaultUsers,
    id: 'defaultUsers',
    isSortable: true,
    header: 'Default users',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.additionalUsers,
    id: 'additionalUsers',
    isSortable: true,
    header: 'Additional Users',
    cell: (info: any) => info.getValue(),
  },
];
