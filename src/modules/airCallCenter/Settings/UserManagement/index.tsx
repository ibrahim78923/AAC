import React from 'react';
import { Box, Button, Tab, Typography } from '@mui/material';
import PlusShared from '@/assets/icons/shared/plus-shared';
import Teams from './Teams';
import Users from './Users';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useUserManagement from './useUserManagement';
import { styles } from './UserManagement.style';
import AddUser from './AddUser';
import AddTeams from './AddTeams';

const UserManagement = () => {
  const {
    tabValue,
    handleChangeTab,
    openDrawerAddUser,
    methodsAddUser,
    handleOpenDrawerAddUser,
    handleCloseDrawerAddUser,
    handleAddUserSubmit,
    handleAddTeamsSubmits,
    handleOpenDrawerAddTeams,
    methodsAddTeams,
    openDrawerAddTeams,
    handleCloseDrawerAddTeams,
    addTeamDrawer,
    setAddTeamDrawer,
    setOpenDrawerAddTeams,
    isViewed,
    setIsViewed,
    setOpenDrawerAddUser,
  } = useUserManagement();
  return (
    <>
      <Box sx={styles?.container}>
        <Box sx={styles?.header}>
          <Box sx={styles?.pageTitle}>
            <Typography variant="h3">User Management</Typography>
          </Box>
          <Box sx={styles?.headerActions}>
            {tabValue === 'users' && (
              <Button
                variant="contained"
                className="small"
                startIcon={<PlusShared />}
                onClick={handleOpenDrawerAddUser}
              >
                Add User
              </Button>
            )}
            {tabValue === 'teams' && (
              <Button
                variant="contained"
                className="small"
                startIcon={<PlusShared />}
                onClick={handleOpenDrawerAddTeams}
              >
                Create Team
              </Button>
            )}
          </Box>
        </Box>

        <Box>
          <TabContext value={tabValue}>
            <Box sx={styles?.tabList}>
              <TabList onChange={handleChangeTab}>
                <Tab label="User" value="users" />
                <Tab label="Teams" value="teams" />
              </TabList>
            </Box>
            <TabPanel value="users">
              <Users
                setOpenDrawerAddUser={setOpenDrawerAddUser}
                setIsViewed={setIsViewed}
              />
            </TabPanel>
            <TabPanel value="teams">
              <Teams
                isDrawerOpen={openDrawerAddTeams}
                onClose={handleCloseDrawerAddTeams}
                formMethods={methodsAddTeams}
                handleSubmit={handleAddTeamsSubmits}
                setOpenDrawerAddTeams={setOpenDrawerAddTeams}
                addTeamDrawer={addTeamDrawer}
                setAddTeamDrawer={setAddTeamDrawer}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>

      <AddUser
        isDrawerOpen={openDrawerAddUser}
        onClose={handleCloseDrawerAddUser}
        formMethods={methodsAddUser}
        handleSubmit={handleAddUserSubmit}
        isViewed={isViewed}
        // isLoading={loadingAddFaq}
      />
      <AddTeams
        isDrawerOpen={openDrawerAddTeams}
        onClose={handleCloseDrawerAddTeams}
        formMethods={methodsAddTeams}
        handleSubmit={handleAddTeamsSubmits}
        addTeamDrawer={addTeamDrawer}
      />
    </>
  );
};

export default UserManagement;
