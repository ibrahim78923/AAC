import { ActivityStatusMenu } from '@/components/ActivityStatusMenu';
import { UserInfo } from '@/components/UserInfo';
import { ACTIVITY_STATUS_MENU, DATE_TIME_FORMAT } from '@/constants';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { truncateText } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

export const data: any = [
  {
    id: 1,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: '£100.00',
    spentAmount: '£09.00',
    currentAmount: '£09.00',
    createdAt: '2023-12-14T11:59:08.238Z',
    status: 'active',
  },
  {
    id: 2,
    cardNumber: 'TVKP18651',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: '£100.00',
    spentAmount: '£09.00',
    currentAmount: '£09.00',
    createdAt: '2023-12-14T11:59:08.238Z',
    status: 'Inactive',
  },
  {
    id: 3,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: '£100.00',
    spentAmount: '£09.00',
    currentAmount: '£09.00',
    createdAt: '2023-12-14T11:59:08.238Z',
    status: 'expired',
  },
];

const MenuItemDataArray = [
  { value: ACTIVITY_STATUS_MENU?.ACTIVE, label: 'Active' },
  { value: ACTIVITY_STATUS_MENU?.INACTIVE, label: 'Inactive' },
];

export const giftCardColumnsFunction = (router: any): any => [
  {
    accessorFn: (row: any) => row?.cardNumber,
    id: 'cardNumber',
    isSortable: true,
    header: 'Card Number',
    cell: (info: any) => (
      <Typography
        component="span"
        onClick={() => {
          router?.push({
            pathname: AIR_LOYALTY_PROGRAM?.GIFT_CARDS_DETAIL,
            query: {
              giftCardId: info?.row?.id,
            },
          });
        }}
        sx={{ cursor: 'pointer', color: 'black' }}
      >
        {truncateText(info?.getValue())}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.cardRecipient,
    id: 'cardRecipient',
    header: 'Card Recipient',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo
        name={info?.row?.original?.cardRecipient?.name}
        email={info?.row?.original?.cardRecipient?.email}
        nameInitial={info?.row?.original?.cardRecipient?.name}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.totalAmount,
    id: 'totalAmount',
    header: 'Total Amount',
    isSortable: true,
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.spentAmount,
    id: 'spentAmount',
    isSortable: false,
    header: 'Spent Amount',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.currentAmount,
    id: 'currentAmount',
    isSortable: false,
    header: 'Current Amount',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'Created At',
    isSortable: true,
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI),
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
