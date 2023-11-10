export const columns: any = [
  {
    accessorFn: (row: any) => row?.meetingName,
    id: 'email',
    cell: (info: any) => info?.getValue(),
    header: 'Email',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.organizer,
    id: 'Sent',
    cell: (info: any) => info?.getValue(),
    header: 'sent',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.type,
    id: 'clickThroughRate',
    isSortable: true,
    header: 'Click Through Rate',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.duration,
    id: 'deliverRate',
    isSortable: true,
    header: 'Deliver Rate',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.businessUnit,
    id: 'opened',
    isSortable: true,
    header: 'Opened',
    cell: (info: any) => info?.getValue(),
  },
];
