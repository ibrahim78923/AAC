import { Checkbox } from '@mui/material';

export const columns = () => {
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'id',
      cell: (info: any) => <Checkbox color="primary" name={info?.getValue()} />,
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue(),
      header: 'Name',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      cell: (info: any) => info?.getValue(),
      header: 'Status',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.outcome,
      id: 'outcome',
      cell: (info: any) => info?.getValue(),
      header: 'Outcome',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.date,
      id: 'dateTime',
      cell: (info: any) => info?.getValue(),
      header: 'Date & Time',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.linkedDeal,
      id: 'linkedDeals',
      cell: (info: any) => info?.getValue(),
      header: 'Linked Deals',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.scheduledBy,
      id: 'Scheduled By',
      cell: (info: any) => info?.getValue(),
      header: 'scheduledBy',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.callType,
      id: 'CallType',
      cell: (info: any) => info?.getValue(),
      header: 'callType',
      isSortable: false,
    },
  ];
};
