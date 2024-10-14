import { UserInfo } from '@/components/UserInfo';
import { DATE_TIME_FORMAT } from '@/constants';
import { truncateText } from '@/utils/avatarUtils';
import dayjs from 'dayjs';

export const transactionTableData = [
  {
    id: 1,
    cardNumber: `TVKP123451`,
    cardRecipientEmail: 'saqibshah@gmail.com',
    cardRecipientName: 'Saqib Shah',
    amount: '£100.00',
    redeemed: '2023-12-14T11:59:08.238Z',
  },
  {
    id: 2,
    cardNumber: `TVKP123451`,
    cardRecipientEmail: 'saqibshah@gmail.com',
    cardRecipientName: 'Saqib Shah',
    amount: '£100.00',
    redeemed: '2023-12-14T11:59:08.238Z',
  },
  {
    id: 3,
    cardNumber: `TVKP123451`,
    cardRecipientEmail: 'saqibshah@gmail.com',
    cardRecipientName: 'Saqib Shah',
    amount: '£100.00',
    redeemed: '2023-12-14T11:59:08.238Z',
  },
];
export const UserList: any = [
  {
    accessorFn: (row: any) => row?.cardNumber,
    id: 'cardNumber',
    isSortable: true,
    header: 'Card Number',
    cell: (info: any) => truncateText(info?.getValue()),
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
        nameInitial={info?.getValue()}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.amount,
    id: 'amount',
    isSortable: true,
    header: 'Amount',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.redeemed,
    id: 'redeemed',
    isSortable: true,
    header: 'Redeemed',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI),
  },
];
