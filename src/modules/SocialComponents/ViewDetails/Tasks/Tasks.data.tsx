import { DATE_FORMAT } from '@/constants';
import { Checkbox, Typography } from '@mui/material';
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
      accessorFn: (row: any) => row?.taskno,
      id: 'taskno',
      cell: (info: any) => info?.getValue(),
      header: 'Task No',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.name,
      id: 'taskname',
      isSortable: true,
      header: 'Task Name',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.duedate,
      id: 'duedate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
    },

    {
      accessorFn: (row: any) => row?.assignedTo?.firstName,
      id: 'assignedTo',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) => (
        <Typography variant="subtitle2">
          {`${info?.row?.original?.assignTo?.firstName}  ${info?.row?.original?.assignTo?.lastName}`}
        </Typography>
      ),
    },
  ];
};
