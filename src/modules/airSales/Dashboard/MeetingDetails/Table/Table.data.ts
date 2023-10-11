// Id: 1,
// meetingName: `60 min ,30 min`,
// organizer: 'Arlo',
// type: '1-to-1',
// duration: 'Multiple',
// businessUnit: 'Standard sandbook 1',
// views: 0,
// meetingBooked: 0,
// conversationRate: 'N/A',

export const columns: any = [
  {
    accessorFn: (row: any) => row.meetingName,
    id: 'meetingName',
    cell: (info: any) => info.getValue(),
    header: 'Meeting Name',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row.organizer,
    id: 'organizer',
    cell: (info: any) => info.getValue(),
    header: 'Organizer',
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row.type,
    id: 'type',
    isSortable: true,
    header: 'Type',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.duration,
    id: 'duration',
    isSortable: true,
    header: 'Duration',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.businessUnit,
    id: 'businessUnit',
    isSortable: true,
    header: 'Business Unit',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.views,
    id: 'views',
    isSortable: true,
    header: 'Views',
    cell: (info: any) => info.getValue(),
  },

  {
    accessorFn: (row: any) => row.meetingBooked,
    id: 'meetingBooked',
    isSortable: true,
    header: 'Meeting Booked',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: any) => row.conversationRate,
    id: 'conversationRate',
    isSortable: true,
    header: 'Conversation Rate',
    cell: (info: any) => info.getValue(),
  },
];
