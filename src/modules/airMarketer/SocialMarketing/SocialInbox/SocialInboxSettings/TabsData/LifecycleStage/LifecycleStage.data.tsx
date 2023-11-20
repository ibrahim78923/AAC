import { Box } from '@mui/material';

import * as Yup from 'yup';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';

export const socialSalesvalidationSchema = Yup?.object()?.shape({
  stageName: Yup?.string()?.required('Field is Required'),
});

export const socialSalesDefaultValues = {
  stageName: '',
};

// table

export const columns = (setIsDraweropen: any, setDeleteModalOpen: any) => {
  return [
    {
      accessorFn: (row: any) => row?.Id,
      id: 'Id',
      cell: () => <DragIndicatorIcon />,
      header: <></>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue(),
      header: 'Stage Name',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.usedIn,
      id: 'usedIn ',
      isSortable: true,
      header: 'Used In',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: true,
      header: 'Action',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsDraweropen('View');
            }}
          >
            <ViewEyeIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsDraweropen('Edit');
            }}
          >
            <EditPenIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => setDeleteModalOpen(true)}
          >
            <DeleteCrossIcon />
          </Box>
        </Box>
      ),
    },
  ];
};

export const drawerTitle: any = {
  Add: 'Add Stage',
  Edit: 'Edit Stage',
  View: 'View Stage',
};
export const drawerButtonTitle: any = {
  Add: 'Add',
  Edit: 'Edit',
};
