import { uiDateFormat } from '@/lib/date-time';
import { truncateText } from '@/utils/avatarUtils';

export const data: any = [
  {
    id: 6757,
    amount: '£100.00',
    date: '2023-12-14T11:59:08.238Z',
  },
  {
    id: 4551,
    amount: '£09.00',
    date: '2023-12-14T11:59:08.238Z',
  },
];

export const giftCardDetailsColumn = [
  {
    accessorFn: (info: any) => info?.amount,
    id: 'amount',
    header: 'Amount',
    isSortable: true,
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (info: any) => info?.date,
    id: 'date',
    header: 'Date',
    isSortable: true,
    cell: (info: any) => uiDateFormat(info?.getValue()),
  },
];
