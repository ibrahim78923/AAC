export const data: any = [
  {
    id: 6757,
    amount: 'PKR 100.00',
    date: 'Mar 03, 2023 - 01:30PM',
  },
  {
    id: 4551,
    amount: 'PKR 09.00',
    date: 'Mar 03, 2023 - 01:30PM',
  },
];

export const giftCardDetailsColumn = [
  {
    accessorFn: (info: any) => info?.amount,
    id: 'amount',
    header: 'Amount',
    isSortable: true,
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (info: any) => info?.date,
    id: 'date',
    header: 'Date',
    isSortable: true,
    cell: (info: any) => info?.getValue() ?? '---',
  },
];
