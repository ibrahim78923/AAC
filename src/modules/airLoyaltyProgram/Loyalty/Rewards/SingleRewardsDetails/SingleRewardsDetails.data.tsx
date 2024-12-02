import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';
import { DATE_TIME_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';

export const singleRewardDetailsColumnsDynamic = () => [
  {
    accessorFn: (row: any) => row?.consumers,
    id: 'consumers',
    header: 'Consumers',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo
        nameInitial={fullNameInitial(info?.row?.original?.consumerName)}
        name={fullName(info?.row?.original.consumerName)}
        avatarSrc={info?.row?.original?.avatarUrl}
        email={info?.row?.original.email}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.address,
    id: 'address',
    isSortable: true,
    header: 'Address',
    cell: (info: any) => <TruncateText text={info?.getValue()} size={40} />,
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    isSortable: true,
    header: 'Created at',
    cell: (info: any) =>
      info?.getValue()
        ? otherDateFormat(
            info?.getValue(),
            DATE_TIME_FORMAT?.MMM_DD_YYYY_hh_mm_A,
          )
        : '---',
  },
];
