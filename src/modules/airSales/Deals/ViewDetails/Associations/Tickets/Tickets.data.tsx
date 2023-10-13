import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { Box } from '@mui/material';
export const columns: any = ({ setOpenDrawer, setIsOpenAlert }) => {
  return [
    {
      accessorFn: (row: any) => row.taskno,
      id: 'contact_id',
      cell: (info: any) => info.getValue(),
      header: 'Contact ID',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row.taskname,
      id: 'Name',
      isSortable: true,
      header: ' Name',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row.duedate,
      id: 'phonenumber',
      isSortable: true,
      header: 'Phone Number',
      cell: (info: any) => info.getValue(),
    },
    {
      accessorFn: (row: any) => row.duedate,
      id: 'jobtitle',
      isSortable: true,
      header: 'Job Title ',
      cell: (info: any) => info.getValue(),
    },

    {
      accessorFn: (row: any) => row.assignedTo,
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
