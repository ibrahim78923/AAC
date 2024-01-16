import { Box } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
export const columns = (handleOpenDrawer: any, handleOpenAlert: any) => {
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue(),
      header: 'Deal Name',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.dealStageId,
      id: 'dealStageId',
      isSortable: true,
      header: 'Stage',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.dealPiplineId,
      id: 'dealPiplineId',
      isSortable: true,
      header: 'Pipeline',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.closeDate,
      id: 'closeDate',
      isSortable: true,
      header: 'CloseDate',
      cell: (info: any) => dayjs(info?.getValue()).format(DATE_FORMAT?.UI),
    },
    {
      accessorFn: (row: any) => row?.ownerId,
      id: 'ownerId',
      isSortable: true,
      header: 'Deal Owner',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.amount,
      id: 'amount',
      isSortable: true,
      header: 'Amount',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?._id,
      id: '_id',
      isSortable: false,
      header: 'Actions',
      cell: (info: any) => {
        const rowData = info?.row?.original;
        return (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => handleOpenDrawer('View', rowData)}
            >
              <ViewEyeIcon />
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => handleOpenDrawer('Edit', rowData)}
            >
              <EditPenIcon />
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => handleOpenAlert(true)}
            >
              <DeleteCrossIcon />
            </Box>
          </Box>
        );
      },
    },
  ];
};
