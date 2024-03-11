import { Box, Grid } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import useTeams from './useTeams';
import { columnsTeams } from './Teams.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';
import ViewTeams from './ViewTeams';

const Teams = (props: any) => {
  const {
    setIsAddTeam,
    setTeamId,
    teamId,
    setIsOpenDelete,
    setIsTeamDrawer,
    isTeamDrawer,
  } = props;
  const {
    theme,
    teamsData,
    setPage,
    setLimit,
    isSuccess,
    isLoading,
    searchBy,
    setSearchBy,
    teamDataById,
  } = useTeams(teamId);

  const columnsProps = {
    setIsTeamDrawer: setIsTeamDrawer,
    setIsOpenDelete: setIsOpenDelete,
    theme: theme,
    setTeamId: setTeamId,
    setIsAddTeam: setIsAddTeam,
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
          <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.SEARCH_USER]}>
            <Search
              searchBy={searchBy}
              width="260px"
              label={'Search here'}
              setSearchBy={setSearchBy}
            />
          </PermissionsGuard>
        </Box>

        <Grid sx={{ paddingTop: '1rem' }}>
          <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.USER_LIST]}>
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
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          </PermissionsGuard>
        </Grid>

        <ViewTeams
          isTeamDrawer={isTeamDrawer}
          setIsTeamDrawer={setIsTeamDrawer}
          teamData={teamDataById}
        />
      </Box>
    </>
  );
};

export default Teams;
