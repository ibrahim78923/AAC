export const voucherRedemptionsColumns = [
  {
    accessorFn: (row: any) => row?.contact,
    id: 'contact',
    cell: (info: any) => info?.getValue(),
    header: 'Contact',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.redeemed,
    id: 'redeemed',
    isSortable: true,
    header: 'Redeemed',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.redemption,
    id: 'redemption',
    isSortable: true,
    header: 'No of redemption',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.channel,
    id: 'channel',
    isSortable: true,
    header: 'Channel',
    cell: (info: any) => info?.getValue(),
  },
];

export const voucherRedemptionsData: any = [
  {
    id: 1,
    channel: 'Scan',
    contact: 'm.asif@ceative.co.uk',
    redemption: '1/2',
    redeemed: '23/09/2022, 09:32',
  },
  {
    id: 2,
    channel: 'Digital code',
    contact: 'm.asif@ceative.co.uk',
    redemption: '2/2',
    redeemed: '23/09/2022, 09:32',
  },
];
