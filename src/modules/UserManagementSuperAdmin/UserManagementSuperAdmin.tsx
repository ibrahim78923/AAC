import React, { useState } from 'react';

import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';

import CommonTabs from '@/components/Tabs';

import CommonDrawer from '@/components/Drawer';

import { ArrowDropDown } from '@mui/icons-material';

import { FilterSharedIcon, PlusSharedIcon } from '@/assets/icons';

import UsersList from './Users/UsersList';

import ProfileCard from '@/components/ProfileCard';
import UsersFilters from './Users/UsersFilters/UsersFilters';

const UserManagementSuperAdmin = () => {
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [openAddUserDrawer, setOpenAddUserDrawer] = useState(false);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [tabVal, setTabVal] = useState<number>(0);
  const [search, setSearch] = useState('');

  const handleClick = (event: any) => {
    setSelectedValue(event.currentTarget);
  };

  const handleAddRole = () => {};

  const handleClose = () => {
    setSelectedValue(null);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">User Management</Typography>
        <Button
          onClick={() =>
            tabVal === 0 ? setOpenAddUserDrawer(true) : handleAddRole
          }
          variant="contained"
          startIcon={<PlusSharedIcon />}
        >
          {tabVal === 0 ? 'Add User' : 'Add Role'}
        </Button>
      </Stack>
      <Box>
        <CommonTabs
          getTabVal={(val: number) => setTabVal(val)}
          searchBarProps={{
            label: 'Search Here',
            setSearchBy: setSearch,
            searchBy: search,
            width: '260px',
          }}
          isHeader={true}
          tabsArray={['User', 'Role and Rights']}
          headerChildren={
            <>
              <Box>
                <Button
                  disabled={selected?.length > 0 ? false : true}
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
          <UsersList selected={selected} setSelected={setSelected} />
          <ProfileCard />
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
          <UsersFilters />
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
