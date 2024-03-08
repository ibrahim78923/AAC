import { DATE_FORMAT } from '@/constants';
import { fullName } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

export const FIRST_ELEMENT = 0;
export const knowledgeInsightsRelatedTicketColumns = [
  {
    accessorFn: (row: any) => row?.subject,
    id: 'subject',
    header: `Subject`,
    cell: (info: any) => (
      <Typography
        variant="body2"
        fontWeight={'fontWeightMedium'}
        sx={{ cursor: 'pointer' }}
      >
        {info?.getValue() ?? '---'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.agentDetails,
    id: 'agentDetails',
    isSortable: true,
    header: 'Assigned to',
    cell: (info: any) =>
      fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created On',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
  },
];
