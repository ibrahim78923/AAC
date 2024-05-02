import { Box, Grid } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import useTeams from './useTeams';
import { columnsTeams } from './Teams.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
import ViewTeams from './ViewTeams';
import CreateTeams from './CreateTeams';

const Teams = (props: any) => {
  const {
    isAddTeam,
    setIsAddTeam,
    setTeamId,
    teamId,
    setIsTeamDrawer,
    isTeamDrawer,
    setIsOpenDelete,
  } = props;

  const {
    theme,
    teamsData,
    setPage,
    setLimit,
    isSuccess,
    teamsDataLoading,
    searchBy,
    setSearchBy,
    teamDataById,
    teamByIdLoading,
  } = useTeams(teamId);

  const columnsProps = {
    setIsTeamDrawer,
    theme,
    setTeamId,
    setIsAddTeam,
    setIsOpenDelete,
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          <PermissionsGuard
            permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.SEARCH_TEAMS]}
          >
            <Search
              searchBy={searchBy}
              width="260px"
              label={'Search here'}
              setSearchBy={setSearchBy}
            />
          </PermissionsGuard>
        </Box>

        <Grid sx={{ paddingTop: '1rem' }}>
          <TanstackTable
            columns={columnsTeams(columnsProps)}
            data={teamsData?.data?.userTeams}
            isPagination
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setLimit}
            count={teamsData?.data?.meta?.pages}
            pageLimit={teamsData?.data?.meta?.limit}
            totalRecords={teamsData?.data?.meta?.total}
            isLoading={teamsDataLoading}
            isSuccess={isSuccess}
          />
        </Grid>
        <ViewTeams
          isTeamDrawer={isTeamDrawer}
          setIsTeamDrawer={setIsTeamDrawer}
          teamData={teamDataById}
          teamByIdLoading={teamByIdLoading}
        />

        {isAddTeam && (
          <CreateTeams
            isAddTeam={isAddTeam}
            setIsAddTeam={setIsAddTeam}
            teamDataById={teamDataById}
            teamByIdLoading={teamByIdLoading}
          />
        )}
      </Box>
    </>
  );
};

export default Teams;
