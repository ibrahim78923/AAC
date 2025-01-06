import { DATE_TIME_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';
import { truncateText } from '@/utils/avatarUtils';

export const giftCardDetailsColumn = [
  {
    accessorFn: (info: any) => info?.transactionAmount,
    id: 'transactionAmount',
    header: 'Amount',
    isSortable: true,
    cell: (info: any) =>
      truncateText(info?.getValue() ? `£${info?.getValue()}` : '---'),
  },
  {
    accessorFn: (info: any) => info?.escrowAmountStatus,
    id: 'escrowAmountStatus',
    header: 'Escrow Amount Status',
    isSortable: true,
    cell: (info: any) => truncateText(info?.getValue() ?? '---'),
  },
  {
    accessorFn: (info: any) => info?.createdAt,
    id: 'createdAt',
    header: 'Date',
    isSortable: true,
    cell: (info: any) =>
      otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.MMM_DD_YYYY_hh_mm_A),
  },
];
