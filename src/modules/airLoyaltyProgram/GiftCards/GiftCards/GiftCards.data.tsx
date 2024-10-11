import { UserInfo } from '@/components/UserInfo';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { Typography } from '@mui/material';

export const data: any = [
  {
    id: 6757,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: 'PKR 100.00',
    spentAmount: 'PKR 09.00',
    currentAmount: 'PKR 09.00',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    active: true,
    upGradable: true,
  },
  {
    id: 4551,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: 'PKR 100.00',
    spentAmount: 'PKR 09.00',
    currentAmount: 'PKR 09.00',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    active: true,
    upGradable: false,
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
              type: 'digital',
            },
          });
        }}
        sx={{ cursor: 'pointer', color: 'black' }}
      >
        {info?.getValue()}
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
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.totalAmount,
    id: 'totalAmount',
    header: 'Total Amount',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.spentAmount,
    id: 'spentAmount',
    isSortable: false,
    header: 'Spent Amount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.currentAmount,
    id: 'currentAmount',
    isSortable: false,
    header: 'Current Amount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'Created At',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
];
