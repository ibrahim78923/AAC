import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AntSwitch } from '@/components/AntSwitch';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_DIGITAL_GIFT_CARD_PERMISSIONS } from '@/constants/permission-keys';
import { Typography } from '@mui/material';

export const data: any = [
  {
    id: 6757,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: 'PKR 100.00',
    currentAmount: 'PKR 09.00',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    active: true,
    upGradable: true,
  },
  {
    id: 4551,
    cardNumber: 'TVKP123451',
    cardRecipient: { email: 'saqibshah@gmail.com', name: 'Saqib Shah' },
    totalAmount: 'PKR 100.00',
    currentAmount: 'PKR 09.00',
    shop: 'Sharemydine',
    createdAt: 'Mar 03, 2023 - 01:30PM',
    active: true,
    upGradable: false,
  },
];

export const digitalGiftCardColumnsFunction = (router: any): any => [
  {
    accessorFn: (row: any) => row?.cardNumber,
    id: 'cardNumber',
    isSortable: true,
    header: 'Card Number',
    cell: (info: any) => (
      <Typography
        component="span"
        onClick={() =>
          router?.push({
            pathname: AIR_LOYALTY_PROGRAM?.SINGLE_GIFT_CARD_TRANSACTION_DETAIL,
            query: {
              giftCardId: info?.row?.id,
              type: 'digital',
            },
          })
        }
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
      <Typography component="span">
        {info?.row?.original?.cardRecipient?.email}
        <br />
        {info?.row?.original?.cardRecipient?.name}
      </Typography>
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
    accessorFn: (row: any) => row?.currentAmount,
    id: 'currentAmount',
    isSortable: false,
    header: 'Current Amount',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.shop,
    id: 'shop',
    header: 'Shop',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.createdAt,
    id: 'createdAt',
    header: 'Created At',
    isSortable: true,
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.active,
    id: 'active',
    header: 'Active',
    isSortable: true,
    cell: (info: any) => (
      <PermissionsGuard
        permissions={[
          AIR_LOYALTY_PROGRAM_GIFT_CARDS_DIGITAL_GIFT_CARD_PERMISSIONS?.ACTIVE_DE_ACTIVE,
        ]}
      >
        <AntSwitch values={info?.getValue()} />
      </PermissionsGuard>
    ),
  },
  {
    accessorFn: (row: any) => row?.upGradable,
    id: 'upGradable',
    header: 'Up Gradable',
    isSortable: true,
    cell: (info: any) => <AntSwitch values={info?.getValue()} />,
  },
];
