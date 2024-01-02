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
      id: 'taskno',
      cell: (info: any) => info?.getValue(),
      header: 'Title',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.taskname,
      id: 'Owner',
      isSortable: true,
      header: 'Owner',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => dayjs(row?.callToDate).format(DATE_FORMAT?.UI),
      id: 'duedate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.outcome,
      id: 'outcome',
      isSortable: true,
      header: 'Outcome',
      cell: (info: any) => info?.getValue(),
    },
  ];
};

export const callsDetails: Record<string, number> = {
  All: 0,
  Upcoming: 0,
  Completed: 0,
};

export const callsStatusColor: Record<string, string> = {
  All: '#0AADC7',
  Upcoming: '#FF4A4A',
  Completed: '#47B263',
};
