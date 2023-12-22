import { DATE_FORMAT } from '@/constants';
import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';

export const columns = ({ handleCheckboxChange, selectedCheckboxes }: any) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: (info: any) => (
        <Checkbox
          color="primary"
          name={'name'}
          onChange={(event) => handleCheckboxChange(event, info?.row?.original)}
          checked={selectedCheckboxes?.some(
            (selectedItem: any) =>
              selectedItem?._id === info?.row?.original?._id,
          )}
        />
      ),
      header: <Checkbox color="primary" name="Id" />,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.title,
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
      accessorFn: (row: any) => row?.callFromDate,
      id: 'dateTime',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
      header: 'Date & Time',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.dealId,
      id: 'linkedDeals',
      cell: (info: any) => info?.getValue(),
      header: 'Linked Deals',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.scheduledBy,
      id: 'Scheduled By',
      cell: (info: any) => info?.getValue(),
      header: 'Scheduled By',
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.callType,
      id: 'CallType',
      cell: (info: any) => info?.getValue()?.replaceAll('_', ' '),
      header: 'Call Type',
      isSortable: false,
    },
  ];
};
