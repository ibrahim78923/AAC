export const tableData = [
  {
    id: '1',
    name: 'Name',
    email: 'email',
    status: 'true',
    channel: 'helo',
  },
  {
    id: '3',
    name: 'helo',
    email: '@gmail.com',
    status: 'true',
    channel: 'Heo',
  },
];
export const tabelColumn: any = (columnsData: any) => [
  ...columnsData?.map((item: any) => ({
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.getValue(),
    header: item,
    isSortable: true,
  })),
];
