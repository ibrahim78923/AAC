import { ActivityStatusMenu } from '@/components/ActivityStatusMenu';
import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';
import { ACTIVITY_STATUS_MENU } from '@/constants';

const MenuItemDataArray = [
  { value: ACTIVITY_STATUS_MENU?.ACTIVE, label: 'Active' },
  { value: ACTIVITY_STATUS_MENU?.INACTIVE, label: 'Inactive' },
  { value: ACTIVITY_STATUS_MENU?.EXPIRED, label: 'Expired' },
];

export const topConsumersColumns = [
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
    accessorFn: (row: any) => row?.status,
    id: 'status',
    header: 'Status',
    isSortable: true,
    cell: (info: any) => {
      const status = info.getValue()?.toUpperCase();

      return (
        <ActivityStatusMenu
          info={info}
          activityStatus={status}
          MenuItemDataArray={MenuItemDataArray}
        />
      );
    },
  },
  {
    accessorFn: (row: any) => row?.currentPointsBalance,
    id: 'currentPointsBalance',
    header: 'Current Points Balance',
    isSortable: true,
    cell: (info: any) => info.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.noOfTransactions,
    id: 'noOfTransactions',
    header: 'No. of Transactions',
    isSortable: true,
    cell: (info: any) => info.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.totalPointsEarned,
    id: 'totalPointsEarned',
    header: 'Total Points Earned',
    isSortable: true,
    cell: (info: any) => info.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.phoneNumber,
    id: 'phoneNumber',
    header: 'Phone Number',
    isSortable: true,
    cell: (info: any) => info.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.tier,
    id: 'tier',
    header: 'Tier',
    isSortable: true,
    cell: (info: any) => <TruncateText text={info.getValue()?.toLowerCase()} />,
  },
];
