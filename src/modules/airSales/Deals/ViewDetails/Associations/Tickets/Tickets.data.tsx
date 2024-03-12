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
      accessorFn: (row: any) => row?.taskno,
      id: 'ticket_id',
      cell: (info: any) => info?.getValue(),
      header: 'Ticket ID',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.taskname,
      id: 'name',
      isSortable: true,
      header: ' Name',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.duedate,
      id: 'status',
      isSortable: true,
      header: 'Status',
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
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_TICKET]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setOpenDrawer('View')}
            >
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_EDIT_TICKET]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => setOpenDrawer('Edit')}
            >
              <EditPenIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REMOVE_TICKET]}
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
