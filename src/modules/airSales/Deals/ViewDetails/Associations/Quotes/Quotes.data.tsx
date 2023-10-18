import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { Box } from '@mui/material';
export const columns: any = () => {
  return [
    {
      accessorFn: (row: any) => row.title,
      id: 'title',
      cell: (info: any) => info.getValue(),
      header: 'Title',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row.createdDate,
      id: 'create_date',
      isSortable: true,
      header: 'Create Date',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row.status,
      id: 'status',
      isSortable: true,
      header: 'Status',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            //  onClick={() => setOpenDrawer('View')}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            // onClick={() => setOpenDrawer('Edit')}
          >
            <EditPenIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            // onClick={() => setIsOpenAlert(true)}
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};
