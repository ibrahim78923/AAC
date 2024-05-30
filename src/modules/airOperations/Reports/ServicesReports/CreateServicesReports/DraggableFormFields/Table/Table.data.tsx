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
export const tabelColumn: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.getValue(),
    header: 'Name',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.channel,
    id: 'channel',
    isSortable: true,
    header: 'Channel',
    cell: (info: any) => info?.getValue(),
  },
];

export const tabelEditorDefaultValue = () => {
  return {
    id: '1',
    name: 'Test',
  };
};
