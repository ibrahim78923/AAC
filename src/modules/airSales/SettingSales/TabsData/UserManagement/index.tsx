import { Box, Button, Typography, Theme, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UserTable from './Users';
import TeamsTable from './Teams';
import useUserManagement from './useUserManagement';
import CommonTabs from '@/components/Tabs';
import CreateTeams from './Teams/CreateTeams';
import { AlertModals } from '@/components/AlertModals';
import AddUsers from './Users/AddUsers';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';

const Users = () => {
  const theme = useTheme<Theme>();
  const {
    activeTab,
    setActiveTab,
    isAddTeam,
    setIsAddTeam,
    setTeamId,
    teamId,
    isOpenDelete,
    isTeamDrawer,
    setIsTeamDrawer,
    setIsOpenDelete,
    handleDeleteTeam,
    isAddUserDrawer,
    setIsAddUserDrawer,
  } = useUserManagement();

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
          boxShadow: '0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A',
          padding: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h4">User Management</Typography>
          <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.ADD_USER]}>
            <Button
              className="small"
              onClick={() => {
                {
                  activeTab === 0
                    ? setIsAddUserDrawer({
                        isToggle: true,
                        type: 'add',
                        data: {},
                      })
                    : setIsAddTeam({ isToggle: true, type: 'add', data: {} });
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
              {activeTab === 0 ? 'Add User' : 'Create Team'}
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
            />
            <TeamsTable
              teamId={teamId}
              setTeamId={setTeamId}
              setIsAddTeam={setIsAddTeam}
              setIsOpenDelete={setIsOpenDelete}
              setIsTeamDrawer={setIsTeamDrawer}
              isTeamDrawer={isTeamDrawer}
            />
          </CommonTabs>
        </Box>
      </Box>
      <CreateTeams isAddTeam={isAddTeam} setIsAddTeam={setIsAddTeam} />
      <AddUsers
        isAddUserDrawer={isAddUserDrawer}
        setIsAddUserDrawer={setIsAddUserDrawer}
      />
      <AlertModals
        message={'Are you sure you want to delete this team?'}
        type={'delete'}
        open={isOpenDelete}
        submitBtnText="Delete"
        cancelBtnText="Cancel"
        handleClose={() => setIsOpenDelete(false)}
        handleSubmitBtn={() => {
          setIsOpenDelete(false);
          handleDeleteTeam(teamId);
        }}
      />
    </>
  );
};

export default Users;
