import {
  fullName,
  fullNameInitial,
  generateImage,
  truncateText,
} from '@/utils/avatarUtils';
import { Avatar, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { ISignUpLoads } from './SignUpLeads.interface';
import { DATE_FORMAT } from '@/constants';

export const getSignUpLeadsColumns = () => [
  {
    accessorFn: (row: ISignUpLoads) => row?.firstName,
    id: 'firstName',
    isSortable: true,
    header: 'Contacts',
    cell: (info: {
      getValue: () => string;
      row: { original: ISignUpLoads };
    }) => (
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
    accessorFn: (row: ISignUpLoads) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',

    cell: (info: any) => (
      <Typography variant="body2" textTransform={'capitalize'}>
        {info?.getValue()?.toLowerCase() ?? '---'}
      </Typography>
    ),
  },
  {
    accessorFn: (row: ISignUpLoads) => row?.address,
    id: 'address',
    isSortable: true,
    header: 'Address',
    cell: (info: { getValue: () => string }) => truncateText(info?.getValue()),
  },
  {
    accessorFn: (row: ISignUpLoads) => row?.dateOfBirth,
    id: 'dateOfBirth',
    isSortable: true,
    header: 'Address',
    cell: (info: { getValue: () => string }) =>
      dayjs(info?.getValue())?.format(DATE_FORMAT?.UI),
  },
  {
    accessorFn: (row: ISignUpLoads) => row?.phoneNumber,
    id: 'phoneNumber',
    isSortable: true,
    header: 'Phone Number',
    cell: (info: { getValue: () => string }) => info?.getValue() ?? '-',
  },
  {
    accessorFn: (row: ISignUpLoads) => row?.whatsAppNumber,
    id: 'whatsAppNumber',
    isSortable: true,
    header: 'WhatsApp Number',
    cell: (info: { getValue: () => string }) => info?.getValue() ?? '-',
  },
];
