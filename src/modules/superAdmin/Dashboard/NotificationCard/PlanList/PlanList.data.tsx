export const columns: any = [
  // {
  //   accessorFn: (row: any) => row.Id,
  //   id: 'Id',
  //   cell: (info: any) => <Checkbox color="primary" name={info.getValue()} />,
  //   header: <Checkbox color="primary" name="Id" />,
  //   isSortable: false,
  // },
  {
    accessorFn: (row: any) => row.planId,
    id: 'planId',
    cell: (info: any) => info.getValue(),
    header: 'Plan ID',
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
    accessorFn: (row: any) => row.planName,
    id: 'planName',
    isSortable: true,
    header: 'Plan Name',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.defaultUsers,
    id: 'defaultUsers',
    isSortable: true,
    header: 'Default Users',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.planPrice,
    id: 'planPrice',
    isSortable: true,
    header: 'Plan Price',
    cell: (info: any) => info.getValue(),
  },
];
