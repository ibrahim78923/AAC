import { Box } from '@mui/material';

import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';
export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
  setDealRecord,
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
      cell: (info: any) => info?.getValue() ?? '--',
    },
    {
      accessorFn: (row: any) => {
        if (row?.dealOwner?.firstName && row?.dealOwner?.lastName) {
          return `${row?.dealOwner?.firstName} ${row?.dealOwner?.lastName}`;
        } else {
          return '--';
        }
      },
      id: 'firstName',
      isSortable: true,
      header: 'Deals Owner',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.dealStage?.name,
      id: 'dealStageId',
      isSortable: true,
      header: 'Deal Stage',
      cell: (info: any) => info?.row?.original?.dealStage?.name,
    },

    {
      accessorFn: (row: any) => row?.Actions,
      id: 'Actions',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setOpenDrawer('View'), setDealRecord(info?.row?.original);
            }}
          >
            <ViewEyeIcon />
          </Box>

          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsOpenAlert(true), setDealRecord(info?.row?.original?._id);
            }}
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
