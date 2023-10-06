import React from 'react';

import { Box, Grid } from '@mui/material';

import UsersSidebar from './UsersSidebar';

import UsersDetails from './UsersDetails/UsersDetails';

const Users = () => {
  return (
    <Box>
      <Grid container>
        <Grid lg={3} md={4} xs={12}>
          <UsersSidebar />
        </Grid>
        <Grid lg={9} md={8} xs={12}>
          <UsersDetails />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Users;
