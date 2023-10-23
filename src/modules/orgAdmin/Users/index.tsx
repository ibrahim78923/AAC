import { Grid } from '@mui/material';

import UsersSidebar from './UsersSidebar';

import UsersDetails from './UsersDetails';

const Users = () => {
  return (
    <Grid container sx={{ backgroundColor: 'white' }} spacing={2}>
      <Grid item lg={3} md={4} xs={12}>
        <UsersSidebar />
      </Grid>
      <Grid item lg={9} md={8} xs={12}>
        <UsersDetails />
      </Grid>
    </Grid>
  );
};

export default Users;
