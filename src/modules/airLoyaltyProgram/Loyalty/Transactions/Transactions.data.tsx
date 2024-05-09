import { Avatar, Box } from '@mui/material';
import {
  LOYALTY_TRANSACTIONS_CHANNEL_MAPPED,
  LOYALTY_TRANSACTIONS_TYPE_MAPPED,
} from '@/constants/api-mapped';
import {
  LOYALTY_TRANSACTIONS_CHANNEL,
  LOYALTY_TRANSACTIONS_TYPE,
} from '@/constants/strings';
import { generateImage, truncateText } from '@/utils/avatarUtils';

export const loyaltytransactionType = [
  {
    _id: LOYALTY_TRANSACTIONS_TYPE?.DIGITAL_REWARD,
    label:
      LOYALTY_TRANSACTIONS_TYPE_MAPPED?.[
        LOYALTY_TRANSACTIONS_TYPE?.DIGITAL_REWARD
      ],
  },
  {
    _id: LOYALTY_TRANSACTIONS_TYPE?.PHYSICAL_REWARD,
    label:
      LOYALTY_TRANSACTIONS_TYPE_MAPPED?.[
        LOYALTY_TRANSACTIONS_TYPE?.PHYSICAL_REWARD
      ],
  },
];

export const loyaltytransactionChannel = [
  {
    _id: LOYALTY_TRANSACTIONS_CHANNEL?.BUSINESS_DASHBOARD,
    label:
      LOYALTY_TRANSACTIONS_CHANNEL_MAPPED?.[
        LOYALTY_TRANSACTIONS_CHANNEL?.BUSINESS_DASHBOARD
      ],
  },
];

export const transactionsListColumnDynamic: any = () => [
  {
    accessorFn: (row: any) => row?.email,
    id: 'contactEmail',
    header: 'Contact Email',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.shopDetails,
    id: 'shopName',
    header: 'Shop Name',
    cell: (info: any) => (
      <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
        <Avatar
          src={generateImage(info?.row?.original?.icon?.src)}
          alt={info?.row?.original?.icon?.name}
        />{' '}
        {truncateText(info?.getValue()?.name)}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.channel,
    id: 'channel',
    header: 'Channel',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.type,
    id: 'type',
    header: 'Type',
    cell: (info: any) => info?.getValue() ?? '---',
  },
  {
    accessorFn: (row: any) => row?.points,
    id: 'credits',
    header: 'Credits',
    cell: (info: any) => info?.getValue() ?? '---',
  },
];
