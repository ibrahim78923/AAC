import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { ISignUpLoads } from './SignUpLeads.interface';
import { DATE_FORMAT } from '@/constants';
import { TruncateText } from '@/components/TruncateText';
import { UserInfo } from '@/components/UserInfo';

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
        <UserInfo
          nameInitial={fullNameInitial(
            info?.getValue(),
            info?.row?.original?.lastName,
          )}
          name={fullName(info?.getValue(), info?.row?.original?.lastName)}
          avatarSrc={generateImage(info?.row?.original?.profilePicture?.url)}
        />
      </Box>
    ),
  },
  {
    accessorFn: (row: ISignUpLoads) => row?.email,
    id: 'email',
    isSortable: true,
    header: 'Email',
    cell: (info: any) => info.getValue(),
  },
  {
    accessorFn: (row: ISignUpLoads) => row?.address,
    id: 'address',
    isSortable: true,
    header: 'Address',
    cell: (info: any) => <TruncateText text={info.getValue()} />,
  },
  {
    accessorFn: (row: ISignUpLoads) => row?.dateOfBirth,
    id: 'dateOfBirth',
    isSortable: true,
    header: 'DOB',
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
