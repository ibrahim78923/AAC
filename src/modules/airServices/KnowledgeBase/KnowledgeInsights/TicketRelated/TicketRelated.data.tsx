import { fullName } from '@/utils/avatarUtils';
import { KnowledgeInsightsRelatedTicketTableRowI } from './TicketRelated.interface';
import { TruncateText } from '@/components/TruncateText';
import { uiDateFormat } from '@/lib/date-time';

export const FIRST_ELEMENT = 0;
export const NO_DATA_MESSAGE = 'No inserted tickets found';

export const knowledgeInsightsRelatedTicketColumns = [
  {
    accessorFn: (row: KnowledgeInsightsRelatedTicketTableRowI) =>
      row?.insertedTickets,
    id: 'subject',
    header: `Subject`,
    cell: (info: any) => <TruncateText text={info?.getValue()?.subject} />,
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
      !!info?.getValue()?.createdAt
        ? uiDateFormat(info?.getValue()?.createdAt)
        : '---',
  },
];
