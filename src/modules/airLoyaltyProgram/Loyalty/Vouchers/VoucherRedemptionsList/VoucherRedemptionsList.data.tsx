import { UserInfo } from '@/components/UserInfo';
import { DATE_TIME_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';

export const voucherRedemptionsColumns = [
  {
    accessorFn: (row: any) => row?.consumerName,
    id: 'consumerName',
    cell: (info: any) => (
      <UserInfo
        name={info?.getValue()}
        email={info?.row?.original?.email}
        avatarSrc={info?.row?.original?.avatarUrl}
        nameInitial={info?.getValue()?.slice(0, 2)}
        avatarSize={{ width: 40, height: 40, variant: 'circular' }}
      />
    ),
    header: 'Consumers',
    isSortable: true,
  },
  {
    accessorFn: (row: any) => row?.redemptionLimitPerConsumer,
    id: 'redemptionLimitPerConsumer',
    isSortable: true,
    header: 'No of redemption',
    cell: (info: any) =>
      `${info?.getValue()}/${info?.row?.original?.redeemedLimit}`,
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created At',
    cell: (info: any) =>
      otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.YMDHM),
  },
];
