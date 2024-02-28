import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';
import { NotesAvatarImage } from '@/assets/images';

export const columns = (handleOpenDrawer: any, handleOpenAlert: any) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'contact_id',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Image src={NotesAvatarImage} width={40} height={40} alt="avatar" />
          <Box>
            <Typography variant="body3" sx={{ color: '#111827' }}>
              {info?.row?.original?.name}
            </Typography>
            <br />
            <Typography variant="body3">
              {info?.row?.original?.domain}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Company Name',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.phoneNumber,
      id: 'Phone Number',
      isSortable: true,
      header: ' Phone Number',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.ownerId,
      id: 'owner',
      isSortable: true,
      header: 'Company Owner',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => {
        const rowData = info?.row?.original;
        return (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => handleOpenDrawer(rowData)}
            >
              <ViewEyeIcon />
            </Box>

            <Box sx={{ cursor: 'pointer' }} onClick={handleOpenAlert}>
              <DeleteCrossIcon />
            </Box>
          </Box>
        );
      },
    },
  ];
};
