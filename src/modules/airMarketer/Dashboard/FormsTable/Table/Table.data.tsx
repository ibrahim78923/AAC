export const columns: any = [
  {
    accessorFn: (row: any) => row?.landingPage,
    id: 'landingPage',
    cell: (info: any) => info?.getValue(),
    header: 'Landing Page',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.publishStatus,
    id: 'publishStatus',
    cell: (info: any) => info?.getValue(),
    header: 'Publish Status',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.views,
    id: 'views',
    isSortable: false,
    header: 'Views',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.totalSubmission,
    id: 'totalSubmission',
    isSortable: false,
    header: 'Total Submission',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    isSortable: false,
    header: 'Type',
    cell: (info: any) => info?.getValue(),
  },
];
