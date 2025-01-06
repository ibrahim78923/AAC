import { UserInfo } from '@/components/UserInfo';
import { DATE_TIME_FORMAT } from '@/constants';
import { otherDateFormat } from '@/lib/date-time';
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
        avatarSrc={info?.row?.original?.recipientAvatar}
      />
    ),
  },
  {
    accessorFn: (row: any) => row?.transactionAmount,
    id: 'transactionAmount',
    isSortable: true,
    header: 'Amount',
    cell: (info: any) =>
      truncateText(info?.getValue() ? `£${info?.getValue()}` : '---'),
  },
  {
    accessorFn: (info: any) => info?.escrowAmountStatus,
    id: 'escrowAmountStatus',
    header: 'Escrow Amount Status',
    isSortable: true,
    cell: (info: any) => truncateText(info?.getValue() ?? '---'),
  },
  {
    accessorFn: (row: any) => row?.redeemed,
    id: 'redeemed',
    isSortable: true,
    header: 'Redeemed',
    cell: (info: any) =>
      otherDateFormat(info?.getValue(), DATE_TIME_FORMAT?.MMM_DD_YYYY_hh_mm_A),
  },
];
