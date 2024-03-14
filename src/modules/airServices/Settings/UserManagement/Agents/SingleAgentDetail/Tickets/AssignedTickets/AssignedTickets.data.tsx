import { AIR_SERVICES, DATE_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

export const assignedTicketsColumnsDynamic: any = (router?: any) => {
  return [
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
            router?.push({
              pathname: AIR_SERVICES?.CHILD_TICKETS_DETAIL,
              query: {
                ticketId: info?.row?.original?._id,
              },
            });
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
      header: 'Name',
      cell: (info: any) => info?.getValue(),
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
      accessorFn: (row: any) => row?.agentDetails,
      id: 'assignedto',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) =>
        fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info?.getValue(),
    },
  ];
};
