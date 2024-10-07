import { UserInfo } from '@/components/UserInfo';
import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export const transactionTableData = [
  {
    id: 1,
    cardNumber: `TVKP123451`,
    cardRecipientEmail: 'saqibshah@gmail.com',
    cardRecipientName: 'Saqib Shah',
    amount: 'PKR100.00',
    shop: `Sharemydine`,
    giftCardType: `Physical Gift Card`,
    date: '2023-12-14T11:59:08.238Z',
    channel: 'Business App',
  },
  {
    id: 2,
    cardNumber: `TVKP123451`,
    cardRecipientEmail: 'saqibshah@gmail.com',
    cardRecipientName: 'Saqib Shah',
    amount: 'PKR100.00',
    shop: `Sharemydine`,
    giftCardType: `Physical Gift Card`,
    date: '2023-12-14T11:59:08.238Z',
    channel: 'Business App',
  },
  {
    id: 3,
    cardNumber: `TVKP123451`,
    cardRecipientEmail: 'saqibshah@gmail.com',
    cardRecipientName: 'Saqib Shah',
    amount: 'PKR100.00',
    shop: `Sharemydine`,
    giftCardType: `Physical Gift Card`,
    date: '2023-12-14T11:59:08.238Z',
    channel: 'Business App',
  },
];
export const UserList: any = [
  {
    accessorFn: (row: any) => row?.cardNumber,
    id: 'cardNumber',
    isSortable: true,
    header: 'Card Number',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.cardRecipientName,
    id: 'cardRecipientEmail cardRecipientName',
    header: 'Card Recipient',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo
        name={info?.getValue()}
        email={info?.row?.original?.cardRecipientEmail}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.amount,
    id: 'amount',
    isSortable: true,
    header: 'Amount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.date,
    id: 'date',
    isSortable: true,
    header: 'Redeemed',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI),
  },
];
