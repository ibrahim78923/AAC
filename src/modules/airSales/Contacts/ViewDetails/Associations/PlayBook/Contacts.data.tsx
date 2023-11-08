import Image from 'next/image';

import { Box, Typography } from '@mui/material';

import { NotesAvatarImage } from '@/assets/images';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';

export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.taskno,
      id: 'contact_id',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Image src={NotesAvatarImage} width={40} height={40} alt="avatar" />
          <Box>
            <Typography variant="body3" sx={{ color: '#111827' }}>
              {info?.row?.original?.taskno}
            </Typography>
            <br />
            <Typography variant="body3">
              {info?.row?.original?.taskname}
            </Typography>
          </Box>
        </Box>
      ),
      header: 'Title',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.CreatedDate,
      id: 'CreatedDate',
      isSortable: true,
      header: ' Created Date',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.CreatedBy,
      id: 'CreatedBy',
      isSortable: true,
      header: 'Created By',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenDrawer('View')}>
            <ViewEyeIcon />
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenDrawer('Edit')}>
            <EditPenIcon />
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => setIsOpenAlert(true)}>
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
