import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { NotesAvatarImage } from '@/assets/images';

export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
  setContactRecord,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setContactRecord: any;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.id,
      id: 'contact_id',
      cell: (info: any) => <Box>{info?.row?.original?._id}</Box>,
      header: 'Contact ID',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.taskname,
      id: 'Name',
      isSortable: true,
      header: ' Name',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Image src={NotesAvatarImage} width={40} height={40} alt="avatar" />
          <Box>
            <Typography variant="body3" sx={{ color: '#111827' }}>
              {info?.row?.original?.firstName} {info?.row?.original?.lastName}
            </Typography>
            <br />
            <Typography variant="body3">
              {info?.row?.original?.email}
            </Typography>
          </Box>
        </Box>
      ),
    },

    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'phonenumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.jobTitle,
      id: 'jobtitle',
      isSortable: true,
      header: 'Job Title ',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDrawer('View'), setContactRecord(info?.row?.original);
            }}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDrawer('Edit'), setContactRecord(info?.row?.original);
            }}
          >
            <EditPenIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsOpenAlert(true), setContactRecord(info?.row?.original);
            }}
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
