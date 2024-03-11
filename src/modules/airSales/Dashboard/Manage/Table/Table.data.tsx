import { Box, Switch } from '@mui/material';

import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { AIR_SALES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const columns = (setIsDeleteModalOpen: any) => {
  return [
    {
      accessorFn: (row: any) => row?.dashboardName,
      id: 'dashboardName',
      isSortable: true,
      header: 'Dashboard Name',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.default,
      id: 'default',
      cell: () => <Switch defaultChecked />,
      header: 'Default',
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.owner,
      id: 'owner',
      isSortable: true,
      header: 'Owner',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.accessRights,
      id: 'accessRights',
      isSortable: true,
      header: 'Access Rights',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.lastViewed,
      id: 'lastViewed',
      isSortable: true,
      header: 'Last Viewed',
      cell: (info: any) => info?.getValue(),
    },

    {
      accessorFn: (row: any) => row?.lastUpdated,
      id: 'lastUpdated',
      isSortable: true,
      header: 'Last Updated',
      cell: (info: any) => info?.getValue(),
    },

    {
      id: 'actions',
      isSortable: true,
      header: 'Actions',
      cell: () => (
        <Box sx={{ display: 'flex' }}>
          <PermissionsGuard
            permissions={[AIR_SALES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
          >
            <Box sx={{ cursor: 'pointer' }} mr={1}>
              <ViewEyeIcon />
            </Box>
          </PermissionsGuard>
          <Box sx={{ cursor: 'pointer' }} mr={1}>
            <EditPenIcon />
          </Box>
          <PermissionsGuard
            permissions={[AIR_SALES_DASHBOARD_PERMISSIONS?.DELETE_DASHBOARD]}
          >
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            >
              <DeleteCrossIcon />
            </Box>
          </PermissionsGuard>
        </Box>
      ),
    },
  ];
};
export const ManageDashboardTableData: any = [
  {
    id: 1,
    default: true,
    owner: 'Olivia Rhye',
    dashboardName: 'Sale_1',
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    id: 2,
    default: true,
    dashboardName: 'Sale_1',
    owner: 'Olivia Rhye',
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    id: 3,
    default: true,
    dashboardName: 'Sale_1',
    owner: 'Olivia Rhye',
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    id: 4,
    default: true,
    dashboardName: 'Sale_1',
    owner: 'Olivia Rhye',
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
  {
    id: 5,
    default: true,
    dashboardName: 'Sale_1',
    owner: 'Olivia Rhye',
    accessRights: 'Everyone',
    lastViewed: '10/04/2023',
    lastUpdated: '10/04/2023',
  },
];
