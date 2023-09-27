import { useState } from 'react';
import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { FilterSharedIcon, PlusSharedIcon } from '@/assets/icons';
import { ArrowDropDown } from '@mui/icons-material';
import CommonTabs from '@/components/Tabs';
import CommonDrawer from '@/components/Drawer';
import React from 'react';

const UserManagementSuperAdmin = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [openAddUserDrawer, setOpenAddUserDrawer] = useState(false);

  const handleClick = (event: any) => {
    setSelectedValue(event.currentTarget);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">User Management</Typography>
        <Button
          onClick={() => {
            setOpenAddUserDrawer(true);
          }}
          variant="contained"
          startIcon={<PlusSharedIcon />}
        >
          Add User
        </Button>
      </Stack>
      <Box>
        <CommonTabs
          isHeader={true}
          tabsArray={['User', 'Role and Rights']}
          headerChildren={
            <>
              <Box>
                <Button
                  onClick={handleClick}
                  sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
                >
                  Actions
                  <ArrowDropDown />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={selectedValue}
                  open={Boolean(selectedValue)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>User List</MenuItem>
                  <MenuItem onClick={handleClose}>View</MenuItem>
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                </Menu>
              </Box>
              <Button
                onClick={() => {
                  setOpenFilterDrawer(true);
                }}
                startIcon={<FilterSharedIcon />}
                sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
              >
                Filter
              </Button>
            </>
          }
        >
          <Typography variant="h6">User</Typography>
          <Typography variant="h6">Role and rights</Typography>
        </CommonTabs>
      </Box>

      {openFilterDrawer && (
        <CommonDrawer
          isDrawerOpen={openFilterDrawer}
          setIsDrawerOpen={setOpenFilterDrawer}
          title="Filters"
          okText="Apply"
          submitHandler={() => {}}
          isOk={true}
        >
          <Typography>content here</Typography>
        </CommonDrawer>
      )}

      {openAddUserDrawer && (
        <CommonDrawer
          isDrawerOpen={openAddUserDrawer}
          setIsDrawerOpen={setOpenAddUserDrawer}
          title="Add User"
          okText="Add"
          submitHandler={() => {}}
          isOk={true}
        >
          <Typography>content here</Typography>
        </CommonDrawer>
      )}
    </Box>
  );
};

export default UserManagementSuperAdmin;
