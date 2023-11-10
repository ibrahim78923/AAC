export const columns: any = [
  {
    accessorFn: (row: any) => row?.meetingName,
    id: 'landingPage',
    cell: (info: any) => info?.getValue(),
    header: 'Landing Page',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.organizer,
    id: 'publishStatus',
    cell: (info: any) => info?.getValue(),
    header: 'Publish Status',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row?.type,
    id: 'views',
    isSortable: true,
    header: 'Views',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.duration,
    id: 'totalSubmission',
    isSortable: true,
    header: 'Total Submission',
    cell: (info: any) => info?.getValue(),
  },

  {
    accessorFn: (row: any) => row?.businessUnit,
    id: 'type',
    isSortable: true,
    header: 'Type',
    cell: (info: any) => info?.getValue(),
  },
];
