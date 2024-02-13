import { Box } from '@mui/material';

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
      accessorFn: (row: any) => row?.name,
      id: 'Deals_name',
      cell: (info: any) => info?.getValue(),
      header: 'Deals Name',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.PhoneNumber,
      id: 'PhoneNumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.DealsOwner,
      id: 'DealsOwner',
      isSortable: true,
      header: 'Deals Owner',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.DealStage,
      id: 'DealStage',
      isSortable: true,
      header: 'Deal Stage',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.Actions,
      id: 'Actions',
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
