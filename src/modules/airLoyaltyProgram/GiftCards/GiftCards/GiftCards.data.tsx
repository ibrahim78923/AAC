import { UserInfo } from '@/components/UserInfo';
import { AIR_LOYALTY_PROGRAM, DATE_TIME_FORMAT } from '@/constants';
import { truncateText } from '@/utils/avatarUtils';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

export const data: any = [
  {
    id: 6757,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: '£100.00',
    spentAmount: '£09.00',
    currentAmount: '£09.00',
    createdAt: '2023-12-14T11:59:08.238Z',
  },
  {
    id: 4551,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: '£100.00',
    spentAmount: '£09.00',
    currentAmount: '£09.00',
    createdAt: '2023-12-14T11:59:08.238Z',
  },
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
];
