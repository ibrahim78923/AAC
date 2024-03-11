import { Box } from '@mui/material';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
export const columns: any = ({
  setOpenDrawer,
  setIsOpenAlert,
}: {
  setOpenDrawer: React.Dispatch<React.SetStateAction<string>>;
  setIsOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return [
    {
      accessorFn: (row: any) => row?.title,
      id: 'contact_id',
      cell: (info: any) => info?.getValue(),
      header: 'Title',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.createdDate,
      id: 'createdDate',
      isSortable: true,
      header: 'Created Date',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.assignedTo,
      id: 'assignedTo',
      isSortable: false,
      header: 'Actions',
      cell: () => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_ATTACHMENT]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setOpenDrawer('View')}
            >
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_EDIT_ATTACHMENT]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setOpenDrawer('Edit')}
            >
              <EditPenIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REMOVE_ATTACHMENT]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setIsOpenAlert(true)}
            >
              <DeleteCrossIcon />
            </Box>
          </PermissionsGuard>
        </Box>
      ),
    },
  ];
};
