import { Avatar, Box } from '@mui/material';
import {
  LOYALTY_TRANSACTIONS_CHANNEL_MAPPED,
  LOYALTY_TRANSACTIONS_TYPE_MAPPED,
} from '@/constants/api-mapped';
import {
  LOYALTY_TRANSACTIONS_CHANNEL,
  LOYALTY_TRANSACTIONS_TYPE,
} from '@/constants/strings';

export const loyaltytransactionType = [
  {
    _id: LOYALTY_TRANSACTIONS_TYPE?.DIGITAL_REWARD,
    label: LOYALTY_TRANSACTIONS_TYPE_MAPPED?.DIGITAL_REWARD,
  },
  {
    _id: LOYALTY_TRANSACTIONS_TYPE?.PHYSICAL_REWARD,
    label: LOYALTY_TRANSACTIONS_TYPE_MAPPED?.PHYSICAL_REWARD,
  },
];

export const loyaltytransactionChannel = [
  {
    _id: LOYALTY_TRANSACTIONS_CHANNEL?.BUSINESS_DASHBOARD,
    label: LOYALTY_TRANSACTIONS_CHANNEL_MAPPED?.BUSINESS_DASHBOARD,
  },
];

export const transactionsListData = [
  {
    id: 1,
    contactEmail: `peter.parker@zylker.com.`,
    shopName: `ABC shop`,
    channel: `customer app`,
    type: `Physical reward`,
    credits: -72,
    icon: '',
  },
  {
    id: 2,
    contactEmail: `peter@zylker.com.`,
    shopName: `ABC shop`,
    channel: `Business dashboard`,
    type: `Points redemption`,
    credits: 15,
    icon: '',
  },
];

export const TransactionsList: any = () => [
  {
    accessorFn: (row: any) => row?.contactEmail,
    id: 'contactEmail',
    header: 'Contact Email',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.shopName,
    id: 'shopName',
    header: 'Shop Name',
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Avatar
          src={info?.row?.original?.icon?.src}
          alt={info?.row?.original?.icon?.name}
        />{' '}
        {info?.getValue()}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.channel,
    id: 'channel',
    header: 'Channel',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    header: 'Type',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.credits,
    id: 'credits',
    header: 'Credits',
    cell: (info: any) => info?.getValue(),
  },
];
