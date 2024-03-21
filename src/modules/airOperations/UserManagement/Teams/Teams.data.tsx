import { Box, Typography } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

export const teamList: any = (
  selectedTeamList: any,
  setSelectedTeamList: any,
  teamListData: any,
  setIsTeamDrawerOpen: any,
  setIsDrawerOpen: any,
  setDeleteModal: any,
) => [
  {
    accessorFn: (row: any) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Team Name',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.teamMembers,
    id: 'teamMembers',
    isSortable: true,
    header: 'Team Members',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() => setIsTeamDrawerOpen(true)}
        >
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.VIEW,
            ]}
          >
            <ViewEyeIcon />
          </PermissionsGuard>
        </Box>
        <Box sx={{ cursor: 'pointer' }} onClick={() => setIsDrawerOpen(true)}>
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.EDIT,
            ]}
          >
            <EditPenIcon />
          </PermissionsGuard>
        </Box>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            setDeleteModal({ val: true, rowId: info?.row?.original?._id })
          }
        >
          <PermissionsGuard
            permissions={[
              AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.DELETE,
            ]}
          >
            <DeleteCrossIcon />
          </PermissionsGuard>
        </Box>
      </Box>
    ),
  },
];
