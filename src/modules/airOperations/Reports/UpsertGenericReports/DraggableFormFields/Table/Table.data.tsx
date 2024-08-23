export const tableColumn: any = (columnsData: any) => [
  ...columnsData?.map((item: any) => ({
    accessorFn: (row: any) => row?.name,
    id: item + Math.random(),
    cell: (info: any) => info?.getValue(),
    header: item,
    isSortable: true,
  })),
];
