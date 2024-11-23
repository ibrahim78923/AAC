import { uiDateFormat } from '@/lib/date-time';
import { truncateText } from '@/utils/avatarUtils';

export const giftCardDetailsColumn = [
  {
    accessorFn: (info: any) => info?.transactionAmount,
    id: 'transactionAmount',
    header: 'Amount',
    isSortable: true,
    cell: (info: any) => truncateText(info?.getValue() ?? '---'),
  },
  {
    accessorFn: (info: any) => info?.createdAt,
    id: 'createdAt',
    header: 'Date',
    isSortable: true,
    cell: (info: any) => uiDateFormat(info?.getValue() ?? '---'),
  },
];
