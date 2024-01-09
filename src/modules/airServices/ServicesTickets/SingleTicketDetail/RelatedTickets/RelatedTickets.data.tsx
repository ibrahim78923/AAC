import { Checkbox, Typography } from '@mui/material';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const columnsFunction: any = (
  data: any = [],
  setIsDrawerOpen: any,
  selectedChildTickets: any = [],
  setSelectedChildTickets: any,
  theme: any,
) => [
  {
    accessorFn: (row: any) => row?._id,
    id: '_id',
    cell: (info: any) => (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={
          !!selectedChildTickets?.find(
            (item: any) => item?._id === info?.getValue(),
          )
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedChildTickets([
                ...selectedChildTickets,
                data?.find((item: any) => item?._id === info?.getValue()),
              ])
            : setSelectedChildTickets(
                selectedChildTickets?.filter((item: any) => {
                  return item?._id !== info?.getValue();
                }),
              );
        }}
        color="primary"
        name={info?.getValue()}
      />
    ),
    header: (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        checked={selectedChildTickets?.length === data?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedChildTickets([...data])
            : setSelectedChildTickets([]);
        }}
        color="primary"
        name="Id"
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.ticketIdNumber,
    id: 'ticketIdNumber',
    header: 'Tickets ID',
    isSortable: true,
    cell: (info: any) => (
      <Typography
        sx={{
          color: 'info.main',
          cursor: 'pointer',
        }}
        onClick={() => {
          setIsDrawerOpen(true);
        }}
      >
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.subject,
    id: 'subject',
    isSortable: true,
    header: 'Task Name',
    cell: (info: any) => (
      <Typography component={'span'} textTransform={'capitalize'}>
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.plannedEndDate,
    id: 'plannedEndDate',
    isSortable: true,
    header: 'Due Date',
    cell: (info: any) =>
      info?.getValue()
        ? dayjs(info?.getValue())?.format(DATE_FORMAT?.UI)
        : '---',
  },
  {
    accessorFn: (row: any) => row?.assignedto,
    id: 'assignedto',
    isSortable: true,
    header: 'Assigned To',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.status,
    id: 'status',
    isSortable: true,
    header: 'Status',
    cell: (info: any) => {
      const status = info?.getValue();
      const color =
        status === 'OPEN'
          ? theme?.palette?.info?.main
          : status === 'PENDING'
            ? theme?.palette?.warning?.main
            : status === 'RESOLVED'
              ? theme?.palette?.success?.main
              : theme?.palette?.error?.main;
      return (
        <Typography
          sx={{
            border: color ? `1px solid ${color}` : 'none',
            color: color,
            padding: '3px 10px',
            borderRadius: '16px',
            cursor: 'pointer',
            width: 'fit-content',
            textTransform: 'capitalize',
          }}
        >
          {status?.toLowerCase()}
        </Typography>
      );
    },
    sortFunction: (a: any, b: any) => {
      const statusOrder: { [key: string]: number } = {
        Open: 1,
        Pending: 2,
        Resolved: 3,
      };
      return statusOrder[a?.status] - statusOrder[b?.status];
    },
  },
];
