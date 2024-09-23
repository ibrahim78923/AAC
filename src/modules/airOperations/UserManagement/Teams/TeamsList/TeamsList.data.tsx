import { Box } from '@mui/material';
import { TeamsTableRowI } from '../Teams.interface';
import { TruncateText } from '@/components/TruncateText';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS } from '@/constants/permission-keys';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';
import { OPERATIONS_TEAM_ACTIONS_CONSTANT } from '../Teams.data';

const { EDIT_OPERATIONS_TEAM, DELETE_OPERATIONS_TEAM, OPERATIONS_TEAM_DETAIL } =
  OPERATIONS_TEAM_ACTIONS_CONSTANT;

export const operationsTeamsListColumnDynamic = (
  setAction: (action: string, data: any) => void,
) => [
  {
    accessorFn: (row: TeamsTableRowI) => row?.name,
    id: 'name',
    isSortable: true,
    header: 'Team Name',
    cell: (info: any) => (
      <TruncateText text={info?.getValue()?.toLowerCase()} />
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
          onClick={() => setAction(OPERATIONS_TEAM_DETAIL, info?.row?.original)}
        >
          <ViewEyeIcon />
        </Box>
        <PermissionsGuard
          permissions={[AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.EDIT]}
        >
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setAction(EDIT_OPERATIONS_TEAM, info?.row?.original);
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
              setAction(DELETE_OPERATIONS_TEAM, info?.row?.original)
            }
          >
            <DeleteCrossIcon />
          </Box>
        </PermissionsGuard>
      </Box>
    ),
  },
];
