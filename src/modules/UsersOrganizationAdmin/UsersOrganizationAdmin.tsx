import { Box, Grid } from '@mui/material';
import React from 'react';
import UsersSidebar from './UsersSidebar/UsersSidebar';
import UsersDetails from './UsersDetails/UsersDetails';

const UsersOrganizationAdmin = () => {
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

export default UsersOrganizationAdmin;
