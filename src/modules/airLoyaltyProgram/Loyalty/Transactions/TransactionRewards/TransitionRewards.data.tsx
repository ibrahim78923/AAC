import { UserInfo } from '@/components/UserInfo';
import { DATE_TIME_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';

export const transactionsRewardsColumns: any = () => [
  {
    accessorFn: (row: any) => row?.consumerName,
    id: 'consumerName',
    header: 'Consumer',
    cell: (info: any) => (
      <UserInfo
        name={info?.getValue()}
        email={info?.row?.original?.email}
        avatarSrc={info?.row?.original?.avatarUrl}
        nameInitial={info?.getValue()?.slice(0, 2)}
        nameProps={{ fontWeight: 700 }}
        avatarSize={{ width: 40, height: 40, variant: 'circular' }}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.title,
    id: 'title',
    header: 'Reward Redeemed',
    cell: (info: any) => (
      <UserInfo
        name={info?.getValue()}
        avatarSrc={info?.row?.original?.rewardAttachment}
        nameInitial={info?.getValue()?.slice(0, 2)}
        avatarSize={{ width: 40, height: 40, variant: 'circular' }}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.redeemedQuantity,
    id: 'redeemedQuantity',
    header: 'Points',
    cell: (info: any) => `-${info?.getValue()}` || '---',
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'CreatedAt',
    cell: (info: any) =>
      otherDateFormat(
        info?.getValue(),
        DATE_TIME_FORMAT?.MMM_DD_YYYY_hh_mm_A,
      ) ?? '---',
  },
];
