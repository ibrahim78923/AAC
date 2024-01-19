import { Box } from '@mui/material';
import { TeamsHeader } from './TeamsHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { teamListData } from './Teams.data';
import { useTeams } from './useTeams';
import UpsertTeams from './UpsertTeams';
import { AgentConversionDelete } from '../AgentConversionDelete';
import TeamsDetails from './TeamsDetails';

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
        <TanstackTable
          data={teamListData}
          columns={teamListColumn}
          isPagination={true}
        />
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
