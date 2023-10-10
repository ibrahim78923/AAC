export const columns: any = [
  {
    accessorFn: (row: any) => row.Id,
    id: 'meetingName',
    cell: (info: any) => info.getValue(),
    header: 'Meeting Name',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row.clientName,
    id: 'organizer',
    cell: (info: any) => info.getValue(),
    header: 'Organizer',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row.productsSuite,
    id: 'type',
    isSortable: true,
    header: 'Type',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.planType,
    id: 'duration',
    isSortable: true,
    header: 'Duration',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.discount,
    id: 'businessUnit',
    isSortable: true,
    header: 'Business Unit',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.defaultUsers,
    id: 'views',
    isSortable: true,
    header: 'Views',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.additionalUsers,
    id: 'meetingBooked',
    isSortable: true,
    header: 'Meeting Booked',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.additionalUsers,
    id: 'conversationRate',
    isSortable: true,
    header: 'Conversation Rate',
    cell: (info: any) => info.getValue(),
  },
];
