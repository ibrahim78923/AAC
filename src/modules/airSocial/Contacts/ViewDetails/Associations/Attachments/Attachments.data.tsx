import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { DATE_FORMAT } from '@/constants';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
export const columns = (handleOpenDrawer: any, handleOpenAlert: any) => {
  return [
    {
      accessorFn: (row: any) => row?.orignalName,
      id: 'contact_id',
      cell: (info: any) => info?.getValue(),
      header: 'Title',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.createdAt,
      id: 'createdDate',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
    },

    {
      accessorFn: (row: any) => row?.actions,
      id: 'actions',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => handleOpenDrawer('View', info?.cell?.row?.original)}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => handleOpenDrawer('Edit', info?.cell?.row?.original)}
          >
            <EditPenIcon />
          </Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => handleOpenAlert()}>
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
