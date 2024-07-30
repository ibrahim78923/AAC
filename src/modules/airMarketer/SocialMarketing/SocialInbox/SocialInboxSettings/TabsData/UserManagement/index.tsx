import { Box, Button, Typography, Theme, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UserTable from './Users';
import TeamsTable from './Teams';
import useUserManagement from './useUserManagement';
import CommonTabs from '@/components/Tabs';
import { AlertModals } from '@/components/AlertModals';
import AddUsers from './Users/AddUsers';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
import { indexNumbers } from '@/constants';

const Users = () => {
  const theme = useTheme<Theme>();
  const {
    activeTab,
    setActiveTab,
    isAddTeam,
    setIsAddTeam,
    setTeamId,
    teamId,
    isTeamDrawer,
    setIsTeamDrawer,
    isAddUserDrawer,
    setIsAddUserDrawer,
    checkedUser,
    setCheckedUser,
    isOpenDelete,
    setIsOpenDelete,
    handleDeleteTeam,
    deleteTeamLoading,
    drawyerType,
  } = useUserManagement();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4">User Management</Typography>
        <PermissionsGuard
          permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.ADD_USER]}
        >
          <Button
            className="small"
            onClick={() => {
              {
                activeTab === indexNumbers?.ZERO
                  ? (setIsAddUserDrawer({
                      ...isAddUserDrawer,
                      isToggle: true,
                      type: drawyerType?.ADD,
                    }),
                    setCheckedUser([]))
                  : setIsAddTeam({ isToggle: true, type: drawyerType?.ADD });
              }
            }}
            variant="contained"
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '10px',
              marginTop: { xs: '10px', sm: '0px' },
              width: { xs: '100%', sm: 'fit-content' },
            }}
          >
            <AddCircleIcon
              sx={{
                color: `${theme?.palette?.common.white}`,
                fontSize: '16px',
              }}
            />
            {activeTab === indexNumbers?.ZERO ? 'Add User' : 'Create Team'}
          </Button>
        </PermissionsGuard>
      </Box>
      <Box sx={{ width: '100%' }}>
        <CommonTabs
          getTabVal={(val: any) => setActiveTab(val)}
          tabsArray={['Users', 'Teams']}
        >
          <UserTable
            isAddUserDrawer={isAddUserDrawer}
            setIsAddUserDrawer={setIsAddUserDrawer}
            checkedUser={checkedUser}
            setCheckedUser={setCheckedUser}
          />

          <TeamsTable
            isAddTeam={isAddTeam}
            teamId={teamId}
            setTeamId={setTeamId}
            setIsAddTeam={setIsAddTeam}
            setIsOpenDelete={setIsOpenDelete}
            setIsTeamDrawer={setIsTeamDrawer}
            isTeamDrawer={isTeamDrawer}
          />
        </CommonTabs>
      </Box>

      {isAddUserDrawer?.isToggle && (
        <AddUsers
          isAddUserDrawer={isAddUserDrawer}
          setIsAddUserDrawer={setIsAddUserDrawer}
          // setCheckedUser={setCheckedUser}
          checkedUser={checkedUser}
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
    </>
  );
};

export default Users;
