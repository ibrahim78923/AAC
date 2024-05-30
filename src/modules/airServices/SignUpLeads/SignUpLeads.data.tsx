import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const getSignUpLeadsColumns = () => [
  {
    accessorFn: (row: any) => row?.firstName,
    id: 'firstName',
    isSortable: true,
    header: 'Contacts',
    cell: (info: any) => (
      <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={1}>
        <Avatar
          sx={{ bgcolor: 'blue.main', width: 28, height: 28 }}
          src={generateImage(info?.row?.original?.profilePicture?.url)}
        >
          <Typography variant="body2" textTransform={'uppercase'}>
            {fullNameInitial(info?.getValue(), info?.row?.original?.lastName)}
          </Typography>
        </Avatar>
        {fullName(info?.getValue(), info?.row?.original?.lastName)}
      </Box>
    ),
  },
  {
    accessorFn: (row: any) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info?.getValue() ?? '-',
  },
  {
    accessorFn: (row: any) => row?.address,
    id: 'address',
    isSortable: true,
    header: 'Address',
    cell: (info: any) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: any) => row?.dateOfBirth,
    id: 'dateOfBirth',
    isSortable: true,
    header: 'Address',
    cell: (info: any) => dayjs(info?.getValue())?.format('MM/DD/YYYY'),
  },
  {
    accessorFn: (row: any) => row?.phoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: any) => info?.getValue() ?? '-',
  },
  {
    accessorFn: (row: any) => row?.whatsAppNumber,
    id: 'whatsAppNumber',
    isSortable: true,
    header: 'WhatsApp Number',
    cell: (info: any) => info?.getValue() ?? '-',
  },
];
