import { DATE_FORMAT } from '@/constants';
import { fullName, truncateText } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { KnowledgeInsightsRelatedTicketTableRowI } from './TicketRelated.interface';

export const FIRST_ELEMENT = 0;
export const NO_DATA_MESSAGE = 'No inserted tickets found';

export const knowledgeInsightsRelatedTicketColumns = [
  {
    accessorFn: (row: KnowledgeInsightsRelatedTicketTableRowI) =>
      row?.insertedTickets,
    id: 'subject',
    header: `Subject`,
    cell: (info: any) => (
      <Typography
        variant="body2"
        fontWeight={'fontWeightMedium'}
        sx={{ cursor: 'pointer' }}
      >
        {truncateText(info?.getValue()?.subject)}
      </Typography>
    ),
  },
  {
    accessorFn: (row: KnowledgeInsightsRelatedTicketTableRowI) =>
      row?.insertedTickets?.agentDetails,
    id: 'agentDetails',
    isSortable: true,
    header: 'Assigned to',
    cell: (info: any) =>
      fullName(info?.getValue()?.firstName, info?.getValue()?.lastName),
  },
  {
    accessorFn: (row: KnowledgeInsightsRelatedTicketTableRowI) =>
      row?.insertedTickets,
    id: 'createdAt',
    isSortable: true,
    header: 'Created On',
    cell: (info: any) =>
      dayjs(info?.getValue()?.createdAt)?.format(DATE_FORMAT?.UI),
  },
];
