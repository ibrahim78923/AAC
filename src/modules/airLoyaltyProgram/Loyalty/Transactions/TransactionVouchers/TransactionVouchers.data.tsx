import { UserInfo } from '@/components/UserInfo';

export const transactionsPointsColumns: any = (
  handleVoucherClick: (rowData: any) => void,
  handleConsumerClick: (rowData: any) => void,
) => [
  {
    accessorFn: (row: any) => row?.voucher,
    id: 'voucher',
    header: 'Voucher',
    cell: (info: any) => (
      <UserInfo
        name={info?.getValue()}
        optionDetail={info?.row?.original?.voucherCode}
        avatarSrc={info?.row?.original?.avatar}
        nameInitial={info?.getValue()?.slice(0, 2)}
        nameProps={{ fontWeight: 700 }}
        avatarSize={{ width: 40, height: 40, variant: 'circular' }}
        handleBoxClick={() => handleVoucherClick(info?.row?.original)}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.consumer,
    id: 'consumer',
    header: 'Consumer',
    cell: (info: any) => (
      <UserInfo
        name={info?.getValue()}
        optionDetail={info?.row?.original?.voucherCode}
        avatarSrc={info?.row?.original?.avatar}
        nameInitial={info?.getValue()?.slice(0, 2)}
        nameProps={{ fontWeight: 700 }}
        avatarSize={{ width: 40, height: 40, variant: 'circular' }}
        handleBoxClick={() => handleConsumerClick(info?.row?.original)}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.discount,
    id: 'discount',
    header: 'Discount Percentage',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.voucherDiscount,
    id: 'voucherDiscount',
    header: 'Voucher Discount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'CreatedAt',
    cell: (info: any) => info?.getValue() ?? '---',
  },
];
