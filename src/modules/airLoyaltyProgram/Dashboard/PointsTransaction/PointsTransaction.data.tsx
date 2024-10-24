import { UserInfo } from '@/components/UserInfo';

export const getPointsTransactionColumns = () => [
  {
    accessorFn: (row: any) => row?.consumer,
    id: 'consumer',
    header: 'Consumers',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo name={info.getValue()?.name?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.points,
    id: 'points',
    header: 'Points',
    isSortable: true,
    cell: (info: any) => info.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'Created At',
    isSortable: true,
    cell: (info: any) => info.getValue() ?? '---',
  },
];
