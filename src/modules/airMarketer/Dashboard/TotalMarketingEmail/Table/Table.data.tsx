export const columns: any = [
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    cell: (info: any) => info?.getValue(),
    header: 'Email',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.sent,
    id: 'sent',
    cell: (info: any) => info?.getValue(),
    header: 'Sent',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.clickThroughRate,
    id: 'clickThroughRate',
    isSortable: false,
    header: 'Click Through Rate',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.deliverRate,
    id: 'deliverRate',
    isSortable: false,
    header: 'Deliver Rate',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.opened,
    id: 'opened',
    isSortable: false,
    header: 'Opened',
    cell: (info: any) => info?.getValue(),
  },
];
