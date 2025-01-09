import { UserInfo } from '@/components/UserInfo';
import { DATE_TIME_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';

export const getPointsTransactionColumns = () => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    header: 'Consumer',
    cell: (info: any) => (
      <UserInfo
        name={info?.getValue()}
        email={info?.row?.original?.email}
        avatarSrc={info?.row?.original?.avatar?.url}
        nameInitial={info?.getValue()?.slice(0, 2)}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.totalPointRedeemed,
    id: 'totalPointRedeemed',
    header: 'Points',
    isSortable: true,
    cell: (info: any) => info.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'Created At',
    isSortable: true,
    cell: (info: any) =>
      otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.MMM_DD_YYYY_hh_mm_A),
  },
];
