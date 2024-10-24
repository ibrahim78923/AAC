export const voucherRedemptionsColumns = [
  {
    accessorFn: (row: any) => row?.consumer,
    id: 'consumer',
    cell: (info: any) => info?.getValue(),
    header: 'Consumer',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.redemption,
    id: 'redemption',
    isSortable: true,
    header: 'No of redemption',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created At',
    cell: (info: any) => info?.getValue(),
  },
];

export const voucherRedemptionsData: any = [
  {
    id: 1,
    consumer: 'm.asif@ceative.co.uk',
    redemption: '1/2',
    createdAt: '23/09/2022, 09:32',
  },
  {
    id: 2,
    consumer: 'm.asif@ceative.co.uk',
    redemption: '2/2',
    createdAt: '23/09/2022, 09:32',
  },
];
