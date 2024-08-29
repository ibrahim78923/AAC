import { Box, Typography } from '@mui/material';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { TeamIsPortalOpenI, TeamsTableRowI } from './Teams.interface';
import { Dispatch, SetStateAction } from 'react';
import { truncateText } from '@/utils/avatarUtils';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS } from '@/constants/permission-keys';

export const operationsTeamsListColumnDynamic = (
  setIsPortalOpen: Dispatch<SetStateAction<TeamIsPortalOpenI>>,
) => [
  {
    accessorFn: (row: TeamsTableRowI) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Team Name',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {truncateText(info?.getValue() ?? '--')}
      </Typography>
    ),
  },
  {
    accessorFn: (row: TeamsTableRowI) => row?.teamMembers,
    id: 'teamMembers',
    isSortable: true,
    header: 'Team Members',
    cell: (info: any) => info?.getValue() ?? '--',
  },
  {
    accessorFn: (row: TeamsTableRowI) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box
          sx={{ cursor: 'pointer' }}
          onClick={() =>
            setIsPortalOpen({
              isOpen: true,
              isView: true,
              data: info?.row?.original,
            })
          }
        >
          <ViewEyeIcon />
        </Box>
        <PermissionsGuard
          permissions={[AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.EDIT]}
        >
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsPortalOpen({
                isOpen: true,
                isUpsert: true,
                data: info?.row?.original,
              });
            }}
          >
            <EditPenIcon />
          </Box>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.DELETE,
          ]}
        >
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setIsPortalOpen({
                isOpen: true,
                isDelete: true,
                data: info?.row?.original,
              })
            }
          >
            <DeleteCrossIcon />
          </Box>
        </PermissionsGuard>
      </Box>
    ),
  },
];
