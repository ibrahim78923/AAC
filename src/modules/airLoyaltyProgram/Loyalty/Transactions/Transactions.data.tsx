import { Avatar, Box } from '@mui/material';
import { TransactionsListI } from './Transactions.interface';
import { AvatarImage } from '@/assets/images';
import { ProfileImage } from '@/assets/images';

export const transactionsListData: TransactionsListI[] = [
  {
    id: 1,
    contactEmail: `peter.parker@zylker.com.`,
    shopName: `ABC shop`,
    channel: `customer app`,
    type: `Physical reward`,
    credits: -72,
    icon: AvatarImage,
  },
  {
    id: 2,
    contactEmail: `peter@zylker.com.`,
    shopName: `ABC shop`,
    channel: `Business dashboard`,
    type: `Points redemption`,
    credits: 15,
    icon: ProfileImage,
  },
  {
    id: 3,
    contactEmail: `peter.parker@zylker.com.`,
    shopName: `ABC shop`,
    channel: `customer app`,
    type: `Points redemption`,
    credits: -25,
    icon: AvatarImage,
  },
  {
    id: 4,
    contactEmail: `peter@zylker.com.`,
    shopName: `ABC shop`,
    channel: `Business dashboard`,
    type: `Points redemption`,
    credits: -90,
    icon: ProfileImage,
  },
  {
    id: 5,
    contactEmail: `peter@zylker.com.`,
    shopName: `ABC shop`,
    channel: `customer app`,
    type: `Points redemption`,
    credits: 90,
    icon: AvatarImage,
  },
  {
    id: 6,
    contactEmail: `peter@zylker.com.`,
    shopName: `ABC shop`,
    channel: `Business dashboard`,
    type: `loyalty credits`,
    credits: 90,
    icon: ProfileImage,
  },
  {
    id: 7,
    contactEmail: `peter@zylker.com.`,
    shopName: `ABC shop`,
    channel: `customer app`,
    type: `loyalty credits`,
    credits: 90,
    icon: AvatarImage,
  },
  {
    id: 8,
    contactEmail: `peter@zylker.com.`,
    shopName: `ABC shop`,
    channel: `customer app`,
    type: `loyalty credits`,
    credits: 90,
    icon: ProfileImage,
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
