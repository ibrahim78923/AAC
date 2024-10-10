import { Box, Button, Grid } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import useTeams from './useTeams';
import { columnsTeams } from './Teams.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';
import ViewTeams from './ViewTeams';
import CreateTeams from './CreateTeams';
import { AddWhiteBgIcon } from '@/assets/icons';
import { AlertModals } from '@/components/AlertModals';

const Teams = () => {
  const {
    theme,
    teamsData,
    setPage,
    setLimit,
    isSuccess,
    teamsDataLoading,
    searchBy,
    setSearchBy,
    isAddTeam,
    setIsAddTeam,
    teamId,
    setTeamId,
    isOpenDelete,
    setIsOpenDelete,
    deleteTeamLoading,
    handleDeleteTeam,
    isTeamDrawer,
    setIsTeamDrawer,
  } = useTeams();

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
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginBottom: '1rem',
            gap: '1rem',
            width: '100%',
          }}
        >
          <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.SEARCH_TEAM]}>
            <Search
              size="small"
              searchBy={searchBy}
              width="260px"
              label={'Search here'}
              setSearchBy={setSearchBy}
            />
          </PermissionsGuard>

          <Box
            display="flex"
            flexWrap={'wrap'}
            gap={1}
            sx={{ width: { xs: '100%', md: 'auto' } }}
          >
            <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.CREATE_TEAMS]}>
              <Button
                sx={{ width: { xs: '100%', sm: 'auto' } }}
                className="small"
                onClick={() => {
                  setIsAddTeam({
                    isToggle: true,
                    type: 'add',
                  });
                }}
                startIcon={<AddWhiteBgIcon />}
                variant="contained"
              >
                Create Team
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
        <Grid sx={{ paddingTop: '1rem' }}>
          <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.TEAM_LIST]}>
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
              currentPage={teamsData?.data?.meta?.page}
            />
          </PermissionsGuard>
        </Grid>
        <ViewTeams
          isTeamDrawer={isTeamDrawer}
          setIsTeamDrawer={setIsTeamDrawer}
          teamId={teamId}
        />

        {isAddTeam?.isToggle && (
          <CreateTeams
            isAddTeam={isAddTeam}
            setIsAddTeam={setIsAddTeam}
            teamId={teamId}
          />
        )}

        {isOpenDelete && (
          <AlertModals
            message={'Are you sure you want to delete this team?'}
            type={'delete'}
            open={isOpenDelete}
            submitBtnText="Delete"
            cancelBtnText="Cancel"
            loading={deleteTeamLoading}
            handleClose={() => setIsOpenDelete(false)}
            handleSubmitBtn={() => {
              handleDeleteTeam(teamId);
            }}
          />
        )}
      </Box>
    </>
  );
};

export default Teams;
