import { UserInfo } from '@/components/UserInfo';
import { uiDateFormat } from '@/lib/date-time';
import { fullNameInitial, truncateText } from '@/utils/avatarUtils';

export const UserList: any = [
  {
    accessorFn: (row: any) => row?.cardNumber,
    id: 'cardNumber',
    isSortable: true,
    header: 'Card Number',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.recipientName,
    id: 'cardRecipientEmail cardRecipientName',
    header: 'Card Recipient',
    isSortable: true,
    cell: (info: any) => (
      <UserInfo
        name={info?.row?.original?.recipientName}
        email={info?.row?.original?.recipientEmail}
        nameInitial={fullNameInitial(info?.row?.original?.recipientName)}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.transactionAmount,
    id: 'transactionAmount',
    isSortable: true,
    header: 'Amount',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.redeemed,
    id: 'redeemed',
    isSortable: true,
    header: 'Redeemed',
    cell: (info: any) => uiDateFormat(info?.getValue()),
  },
];
