import { DATE_TIME_FORMAT } from '@/constants';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

export const settlementsTableData = [
  {
    id: 1,
    giftCardCreatedFor: 'Sharemydine',
    giftCardUsedIn: 'Sharemydine',
    amount: 'PKR100.00',
    date: '2023-12-14T11:59:08.238Z',
    cardNumber: `TVKP123451`,
    cardRecipientEmail: 'saqibshah@gmail.com',
    cardRecipientName: 'Saqib Shah',
  },
  {
    id: 1,
    giftCardCreatedFor: 'Sharemydine',
    giftCardUsedIn: 'Sharemydine',
    amount: 'PKR100.00',
    date: '2023-12-14T11:59:08.238Z',
    cardNumber: `TVKP123451`,
    cardRecipientEmail: 'saqibshah@gmail.com',
    cardRecipientName: 'Saqib Shah',
  },
  {
    id: 1,
    giftCardCreatedFor: 'Sharemydine',
    giftCardUsedIn: 'Sharemydine',
    amount: 'PKR100.00',
    date: '2023-12-14T11:59:08.238Z',
    cardNumber: `TVKP123451`,
    cardRecipientEmail: 'saqibshah@gmail.com',
    cardRecipientName: 'Saqib Shah',
  },
];
export const UserList: any = [
  {
    accessorFn: (row: any) => row?.giftCardCreatedFor,
    id: 'giftCardCreatedFor',
    isSortable: true,
    header: 'Gift Card Created For',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.giftCardUsedIn,
    id: 'giftCardUsedIn',
    isSortable: true,
    header: 'Gift Card Used In',
    cell: (info: any) => info?.getValue(),
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
    header: 'Date',
    cell: (info: any) => dayjs(info?.getValue())?.format(DATE_TIME_FORMAT?.UI),
  },
  {
    accessorFn: (row: any) => row?.cardNumber,
    id: 'cardNumber',
    isSortable: true,
    header: 'Card Number',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.cardRecipientName,
    id: 'cardRecipientName cardRecipientEmail',
    header: 'Card Recipient',
    isSortable: true,
    cell: (info: any) => (
      <>
        <Typography variant="body4">
          {info?.row?.original?.cardRecipientEmail}
        </Typography>
        <br />
        <Typography variant="body4">{info?.getValue()}</Typography>
      </>
    ),
  },
];
