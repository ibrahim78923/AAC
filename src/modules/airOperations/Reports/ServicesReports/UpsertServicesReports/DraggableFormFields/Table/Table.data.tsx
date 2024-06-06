export const tableData = [
  {
    id: '1',
    name: 'Name',
    email: 'email',
    status: 'true',
    channel: 'hello',
  },
  {
    id: '3',
    name: 'hello',
    email: '@gmail.com',
    status: 'true',
    channel: 'Heo',
  },
];
export const tableColumn: any = (columnsData: any) => [
  ...columnsData?.map((item: any) => ({
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.getValue(),
    header: item,
    isSortable: true,
  })),
];
