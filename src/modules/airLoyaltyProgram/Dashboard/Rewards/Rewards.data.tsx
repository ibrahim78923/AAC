import { ActivityStatusMenu } from '@/components/ActivityStatusMenu';
import { UserInfo } from '@/components/UserInfo';
import { ACTIVITY_STATUS_MENU } from '@/constants';

const MenuItemDataArray = [
  { value: ACTIVITY_STATUS_MENU?.ACTIVE, label: 'Active' },
  { value: ACTIVITY_STATUS_MENU?.INACTIVE, label: 'Inactive' },
];

export const getRewardsColumns = () => [
  {
    accessorFn: (row: any) => row?.rewardTitle,
    id: 'rewardTitle',
    header: 'Reward Title',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo name={info.getValue()?.name?.toLowerCase()} />
    ),
  },
  {
    accessorFn: (row: any) => row?.requiredPoints,
    id: 'requiredPoints',
    header: 'Required Points',
    isSortable: true,
    cell: (info: any) => info.getValue() ?? '---',
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
];
