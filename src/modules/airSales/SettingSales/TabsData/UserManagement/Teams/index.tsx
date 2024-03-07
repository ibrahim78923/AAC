import { Box, Grid } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import useTeams from './useTeams';
import { columnsTeams } from './Teams.data';

const Teams = (props: any) => {
  const { setIsAddTeam, setTeamId, setIsOpenDelete, setIsTeamDrawer } = props;
  const {
    theme,
    teamsData,
    setPage,
    setLimit,
    isSuccess,
    isLoading,
    searchBy,
    setSearchBy,
  } = useTeams();

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
          <Search
            searchBy={searchBy}
            width="260px"
            label={'Search here'}
            setSearchBy={setSearchBy}
          />
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
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Grid>
      </Box>
    </>
  );
};

export default Teams;
