import React from 'react';
import { Box, Button, Tab, Typography } from '@mui/material';
import PlusShared from '@/assets/icons/shared/plus-shared';
import Teams from './Teams';
import Users from './Users';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useUserManagement from './useUserManagement';
import { styles } from './UserManagement.style';
import AddUser from './AddUser';

const UserManagement = () => {
  const {
    tabValue,
    handleChangeTab,
    openDrawerAddUser,
    methodsAddUser,
    handleOpenDrawerAddUser,
    handleCloseDrawerAddUser,
    handleAddUserSubmit,
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
              >
                Add Team
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
              <Users />
            </TabPanel>
            <TabPanel value="teams">
              <Teams />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>

      <AddUser
        isDrawerOpen={openDrawerAddUser}
        onClose={handleCloseDrawerAddUser}
        formMethods={methodsAddUser}
        handleSubmit={handleAddUserSubmit}
        // isLoading={loadingAddFaq}
      />
    </>
  );
};

export default UserManagement;
