import { ActivityStatusMenu } from '@/components/ActivityStatusMenu';
import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';
import { ACTIVITY_STATUS_MENU } from '@/constants';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';

const MenuItemDataArray = [
  { value: ACTIVITY_STATUS_MENU?.ACTIVE, label: 'Active' },
  { value: ACTIVITY_STATUS_MENU?.INACTIVE, label: 'Inactive' },
];

export const getTopConsumersColumns = (
  handleConsumerClick: (id: string) => void,
) => [
  {
    accessorFn: (row: any) => row,
    id: 'firstName',
    isSortable: true,
    header: 'Consumer',
    cell: (info: any) => {
      const consumerId = info?.getValue()?._id;
      return (
        <UserInfo
          handleBoxClick={() => handleConsumerClick(consumerId)}
          boxProps={{ sx: { cursor: 'pointer' } }}
          nameProps={{ sx: { whiteSpace: 'nowrap' } }}
          nameInitial={fullNameInitial(
            info?.getValue()?.firstName,
            info?.getValue()?.lastName,
          )}
          name={fullName(
            info?.getValue()?.firstName,
            info?.getValue()?.lastName,
          )}
          avatarSrc={info?.row?.original?.avatar?.url}
          email={info?.getValue()?.email}
        />
      );
    },
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
          menuItemDataArray={MenuItemDataArray}
        />
      );
    },
  },
  {
    accessorFn: (row: any) => row?.currentPointBalance,
    id: 'currentPointBalance',
    header: 'Current Points Balance',
    isSortable: true,
    cell: (info: any) => info.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.numberofTransactions,
    id: 'numberofTransactions',
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
    accessorFn: (row: any) => row?.tierDetails,
    id: 'tierDetails',
    header: 'Tier',
    isSortable: true,
    cell: (info: any) => (
      <TruncateText text={info.getValue()?.name?.toLowerCase()} />
    ),
  },
];
