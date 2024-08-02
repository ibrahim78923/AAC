import { Box, Button, Grid } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import useTeams from './useTeams';
import { columnsTeams } from './Teams.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
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
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
          display="flex"
          justifyContent="space-between"
        >
          <PermissionsGuard
            permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.SEARCH_TEAMS]}
          >
            <Search
              size="small"
              searchBy={searchBy}
              width="260px"
              label={'Search here'}
              setSearchBy={setSearchBy}
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.CREATE_TEAM]}
          >
            <Button
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
            currentPage={teamsData?.data?.meta?.page}
          />
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
