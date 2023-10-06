import React, { useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import FilterUser from '../Drawers/FilterUser';

import AddUser from '../Drawers/AddUser';

import { FilterSharedIcon, PlusSharedIcon } from '@/assets/icons';

const UsersSidebar = () => {
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);
  const [isOpenAdduserDrawer, setIsOpenAdduserDrawer] = useState(false);
  const theme = useTheme();

  return (
    <Box p={'24px'}>
      <Box
        py={1}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h3">Users</Typography>
        <Button
          onClick={() => {
            setIsOpenAdduserDrawer(true);
          }}
          variant="contained"
          startIcon={<PlusSharedIcon />}
        >
          Add User
        </Button>
      </Box>
      <Divider />
      <Box
        py={1}
        sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}
      >
        {/* <Search label="Placeholder" /> */}
        <Button
          onClick={() => {
            setIsOpenFilterDrawer(true);
          }}
          sx={{
            border: '1px solid grey',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FilterSharedIcon />
        </Button>
      </Box>

      <Box
        className="users-wrapper"
        sx={{
          backgroundColor: theme.palette.grey[400],
          borderRadius: '4px',
          padding: '11px 8px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Roberts Rohan</Typography>
              <Typography>active</Typography>
            </Box>
            <Typography>Robert@airapplecart.co.uk</Typography>
          </Box>
        </Box>
      </Box>

      {isOpenFilterDrawer && (
        <CommonDrawer
          isDrawerOpen={isOpenFilterDrawer}
          submitHandler={() => {
            setIsOpenFilterDrawer(false);
          }}
          onClose={() => {
            setIsOpenFilterDrawer(false);
          }}
          title="Filters"
          okText="Apply"
          isOk={true}
        >
          <FilterUser />
        </CommonDrawer>
      )}

      {isOpenAdduserDrawer && (
        <CommonDrawer
          isDrawerOpen={isOpenAdduserDrawer}
          submitHandler={() => {
            setIsOpenAdduserDrawer(false);
          }}
          onClose={() => {
            setIsOpenAdduserDrawer(false);
          }}
          title="Add User"
          okText="Add"
          isOk={true}
        >
          <AddUser />
        </CommonDrawer>
      )}
    </Box>
  );
};

export default UsersSidebar;
