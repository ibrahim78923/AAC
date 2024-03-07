import { Box } from '@mui/material';
import { TeamsHeader } from './TeamsHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { teamListData } from './Teams.data';
import { useTeams } from './useTeams';
import UpsertTeams from './UpsertTeams';
import { AgentConversionDelete } from '../AgentConversionDelete';
import TeamsDetails from './TeamsDetails';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS } from '@/constants/permission-keys';

export const Teams = () => {
  const {
    teamListColumn,
    isDrawerOpen,
    setIsDrawerOpen,
    deleteModal,
    setDeleteModal,
    isTeamDrawerOpen,
    setIsTeamDrawerOpen,
  } = useTeams();

  return (
    <Box>
      <TeamsHeader />
      <br />
      <Box mt={'0.75rem'}>
        <PermissionsGuard
          permissions={[
            AIR_OPERATIONS_USER_MANAGEMENT_TEAMS_PERMISSIONS?.TEAM_LIST,
          ]}
        >
          <TanstackTable
            data={teamListData}
            columns={teamListColumn}
            isPagination={true}
          />
        </PermissionsGuard>
        <TeamsDetails
          isTeamDrawerOpen={isTeamDrawerOpen}
          setIsTeamDrawerOpen={setIsTeamDrawerOpen}
          title={'Test'}
          okText={'Save'}
        />
        <UpsertTeams
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          title={'Edit Team'}
          okText={'Save'}
        />
        <AgentConversionDelete
          message={'Are you sure you want to delete this Team?'}
          open={deleteModal}
          handleClose={() => {
            setDeleteModal(false);
          }}
        />
      </Box>
    </Box>
  );
};
