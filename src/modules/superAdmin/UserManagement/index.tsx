import React, { useState } from 'react';

import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';

import CommonTabs from '@/components/Tabs';

import Users from './Users';

import UsersManagementFilters from './UsersManagmentFilters/index';

import RolesAndRights from './RolesAndRights';

import AddUser from './Users/AddUser';

import SuperAdminUsers from './Users/SuperAdminUsers';

import { ArrowDropDown } from '@mui/icons-material';

import { FilterSharedIcon, PlusSharedIcon } from '@/assets/icons';

const UserManagement = () => {
  const navigate = useRouter();
  const theme = useTheme();
  const [isOpenAddUserDrawer, setIsOpenAddUserDrawer] = useState(false);
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [tabVal, setTabVal] = useState<number>(0);
  const [search, setSearch] = useState('');

  const handleClick = (event: any) => {
    setSelectedValue(event.currentTarget);
  };

  const handleAddRole = () => {
    navigate.push('/super-admin/user-management/add-role');
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  return (
    <Box
      sx={{ border: '1px solid #EAECF0', p: '24px 0px', borderRadius: '8px' }}
    >
      <Box
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: '0px 24px', display: { md: 'flex' } }}
      >
        <Typography variant="h4">User Management</Typography>
        <Button
          onClick={() =>
            tabVal === 2 ? handleAddRole() : setIsOpenAddUserDrawer(true)
          }
          variant="contained"
          startIcon={<PlusSharedIcon />}
        >
          {tabVal === 2 ? 'Add Role' : 'Add User'}
        </Button>
      </Box>

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
          tabsArray={['Company Owners', 'Super Admin Users', 'Role and Rights']}
          headerChildren={
            <>
              <Box>
                <Button
                  onClick={handleClick}
                  sx={{
                    border: `1px solid ${theme?.palette?.custom?.dark}`,
                    color: theme?.palette?.custom?.main,
                    width: '112px',
                    height: '36px',
                  }}
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
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.custom?.main,
                  width: '95px',
                  height: '36px',
                }}
              >
                Filter
              </Button>
            </>
          }
        >
          <Users />
          <SuperAdminUsers />
          <RolesAndRights />
        </CommonTabs>
      </Box>

      {isOpenFilterDrawer && (
        <UsersManagementFilters
          tabVal={tabVal}
          isOpen={isOpenFilterDrawer}
          setIsOpen={setIsOpenFilterDrawer}
        />
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
