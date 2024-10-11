import { UserInfo } from '@/components/UserInfo';

export const transactionsPointsColumns: any = () => [
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
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.points,
    id: 'points',
    header: 'Earned Points',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.rewardRedeemed,
    id: 'rewardRedeemed',
    header: 'Reward Redeemed',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'CreatedAt',
    cell: (info: any) => info?.getValue() ?? '---',
  },
];
