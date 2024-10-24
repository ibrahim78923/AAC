import { TruncateText } from '@/components/TruncateText';
import { AIR_SERVICES } from '@/constants/routes';
import { uiDateFormat } from '@/lib/date-time';
import { fullName } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';

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
          {<TruncateText text={info?.getValue()} />}
        </Typography>
      ),
    },
    {
      accessorFn: (row: any) => row?.subject,
      id: 'subject',
      isSortable: true,
      header: 'Name',
      cell: (info: any) => (
        <TruncateText text={info?.getValue()?.toLowerCase()} />
      ),
    },
    {
      accessorFn: (row: any) => row?.plannedEndDate,
      id: 'plannedEndDate',
      isSortable: true,
      header: 'Due Date',
      cell: (info: any) =>
        info?.getValue() ? uiDateFormat(info?.getValue()) : '---',
    },
    {
      accessorFn: (row: any) => row?.agentDetails,
      id: 'assignedto',
      isSortable: true,
      header: 'Assigned To',
      cell: (info: any) => (
        <TruncateText
          text={fullName(
            info?.getValue()?.firstName?.toLowerCase(),
            info?.getValue()?.lastName?.toLowerCase(),
          )}
        />
      ),
    },
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => (
        <TruncateText text={info?.getValue()?.toLowerCase()} />
      ),
    },
  ];
};
