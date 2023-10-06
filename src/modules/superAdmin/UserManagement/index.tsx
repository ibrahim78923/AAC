import React, { useState } from 'react';

import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';

import CommonTabs from '@/components/Tabs';

import CommonDrawer from '@/components/CommonDrawer';

import Users from './Users';

import UsersFilters from './Users/UsersFilters';

import RolesAndRights from './RolesAndRights';

import AddUser from './Users/AddUser';

import { ArrowDropDown } from '@mui/icons-material';

import { FilterSharedIcon, PlusSharedIcon } from '@/assets/icons';

const UserManagement = () => {
  const [isOpenAddUserDrawer, setIsOpenAddUserDrawer] = useState(false);
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
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
    <Box
      sx={{ border: '1px solid #EAECF0', p: '24px 0px', borderRadius: '8px' }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '0px 24px' }}
      >
        <Typography variant="h4">User Management</Typography>
        <Button
          onClick={() =>
            tabVal === 0 ? setIsOpenAddUserDrawer(true) : handleAddRole
          }
          variant="contained"
          startIcon={<PlusSharedIcon />}
        >
          {tabVal === 0 ? 'Add User' : 'Add Role'}
        </Button>
      </Stack>
      <Box sx={{ padding: '0px 24px' }}>
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
                  // disabled={selected?.length > 0 ? false : true}
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
                  setIsOpenFilterDrawer(true);
                }}
                startIcon={<FilterSharedIcon />}
                sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
              >
                Filter
              </Button>
            </>
          }
        >
          <Users />
          <RolesAndRights />
        </CommonTabs>
      </Box>

      {isOpenFilterDrawer && (
        <CommonDrawer
          isDrawerOpen={isOpenFilterDrawer}
          title="Filters"
          okText="Apply"
          submitHandler={() => {
            setIsOpenFilterDrawer(false);
          }}
          onClose={() => {
            setIsOpenFilterDrawer(false);
          }}
          isOk={true}
        >
          <UsersFilters />
        </CommonDrawer>
      )}

      {isOpenAddUserDrawer && (
        <AddUser
          isOpenAddUserDrawer={isOpenAddUserDrawer}
          setIsOpenAddUserDrawer={setIsOpenAddUserDrawer}
        />
      )}
    </Box>
  );
};

export default UserManagement;
