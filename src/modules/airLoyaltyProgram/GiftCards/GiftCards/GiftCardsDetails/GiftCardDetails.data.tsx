import dayjs from 'dayjs';

export const rulesList = [
  {
    _id: 1,
    amount: 'PKR 100.00',
    shop: 'sharemydine',
    date: '2023-12-14T11:59:08.238Z',
  },
  {
    _id: 2,
    amount: 'PKR 100.00',
    shop: 'sharemydine',
    date: '2023-12-14T11:59:08.238Z',
  },
  {
    _id: 3,
    amount: 'PKR 100.00',
    shop: 'sharemydine',
    date: '2023-12-14T11:59:08.238Z',
  },
];

export const rulesColumns = [
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
    cell: (info: any) =>
      dayjs(info?.getValue())?.format('MMMM DD, YYYY: hh:mm'),
  },
];
