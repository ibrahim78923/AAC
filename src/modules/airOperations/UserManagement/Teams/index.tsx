import { Box } from '@mui/material';
import { TeamsHeader } from './TeamsHeader';
import TanstackTable from '@/components/Table/TanstackTable';
import { teamListData } from './Teams.data';
import { useTeams } from './useTeams';

export const Teams = () => {
  const { selectedTeamList, teamListColumn } = useTeams();

  return (
    <Box>
      <TeamsHeader selectedTeamList={selectedTeamList} />
      <Box mt={'0.75rem'}>
        <TanstackTable
          data={teamListData}
          columns={teamListColumn}
          isPagination={true}
        />
      </Box>
    </Box>
  );
};
