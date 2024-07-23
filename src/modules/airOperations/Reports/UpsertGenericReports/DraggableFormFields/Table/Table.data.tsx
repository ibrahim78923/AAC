export const tableColumn: any = (columnsData: any) => [
  ...columnsData?.map((item: any) => ({
    accessorFn: (row: any) => row?.name,
    id: 'name',
    cell: (info: any) => info?.getValue(),
    header: item,
    isSortable: true,
  })),
];
