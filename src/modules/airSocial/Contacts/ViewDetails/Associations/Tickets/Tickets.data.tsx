import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';
import { Box } from '@mui/material';
import { DRAWER_TITLE } from '@/constants';

export const columns: any = ({ handleOpenDrawer, handleOpenAlert }: any) => {
  return [
    {
      accessorFn: (row: any) => row?.ticketIdNumber,
      id: 'ticketIdNumber',
      cell: (info: any) => info?.getValue(),
      header: 'Ticket No.',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.subject,
      id: 'subject',
      isSortable: true,
      header: 'Subject',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => {
        const firstLetter = info?.getValue()?.charAt(0).toUpperCase();
        const remainingLetters = info?.getValue().slice(1).toLowerCase();
        return firstLetter + remainingLetters;
      },
    },

    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => handleOpenDrawer(DRAWER_TITLE?.VIEW)}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => handleOpenAlert(info?.getValue())}
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
