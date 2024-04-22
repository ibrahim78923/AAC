import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export const giftCardDetailsColumn = [
  {
    accessorFn: (info: any) => info?.amount,
    id: 'amount',
    header: 'Amount',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (info: any) => info?.shop,
    id: 'shop',
    header: 'Shop',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (info: any) => info?.date,
    id: 'date',
    header: 'Date',
    isSortable: true,
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
  },
];
