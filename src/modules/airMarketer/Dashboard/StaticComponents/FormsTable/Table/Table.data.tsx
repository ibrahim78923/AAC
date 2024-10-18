export const columns: any = [
  {
    accessorFn: (row: any) => row?.name,
    id: 'landingPage',
    header: 'Landing Page',
    isSortable: false,
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },

  {
    accessorFn: (row: any) => row?.status,
    id: 'publishStatus',
    header: 'Publish Status',
    isSortable: false,
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },

  {
    accessorFn: (row: any) => row?.pageViews,
    id: 'views',
    isSortable: false,
    header: 'Views',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },

  {
    accessorFn: (row: any) => row?.submissions,
    id: 'totalSubmission',
    isSortable: false,
    header: 'Total Submission',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },

  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    isSortable: false,
    header: 'Type',
    cell: (info: any) => info?.getValue() ?? 'N/A',
  },
];
