export const columns: any = [
  {
    accessorFn: (row: any) => row?.subject,
    id: 'subject',
    cell: (info: any) => info?.getValue() ?? 'N/A',
    header: 'Email',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.send,
    id: 'send',
    cell: (info: any) => info?.getValue() ?? 'N/A',
    header: 'Sent',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.clicksCount,
    // clickThroughRate
    id: 'clicksCount',
    isSortable: false,
    header: 'Click through rate',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },

  {
    accessorFn: (row: any) => row?.delivered,
    id: 'delivered',
    isSortable: false,
    header: 'Deliver rate',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },

  {
    accessorFn: (row: any) => row?.open,
    id: 'open',
    isSortable: false,
    header: 'Opened',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
];
