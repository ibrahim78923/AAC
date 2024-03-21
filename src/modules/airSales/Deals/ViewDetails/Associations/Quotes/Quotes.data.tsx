import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { DeleteCrossIcon, ViewEyeIcon } from '@/assets/icons';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { Box } from '@mui/material';
export const columns: any = () => {
  return [
    {
      accessorFn: (row: any) => row?.title,
      id: 'title',
      cell: (info: any) => info?.getValue(),
      header: 'Title',
      isSortable: true,
    },

    {
      accessorFn: (row: any) => row?.createdDate,
      id: 'create_date',
      isSortable: true,
      header: 'Create Date',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.status,
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
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_VIEW_QUOTE]}
          >
            <Box sx={{ cursor: 'pointer' }}>
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_SALES_DEALS_PERMISSIONS?.DEAL_REMOVE_QUOTE]}
          >
            <Box sx={{ cursor: 'pointer' }}>
              <DeleteCrossIcon />
            </Box>
          </PermissionsGuard>
        </Box>
      ),
    },
  ];
};
