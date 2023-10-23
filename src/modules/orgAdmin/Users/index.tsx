import { Grid } from '@mui/material';

import UsersSidebar from './UsersSidebar';

import UsersDetails from './UsersDetails';

const Users = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xl={3} lg={4} xs={12}>
        <UsersSidebar />
      </Grid>
      <Grid item xl={9} lg={8} xs={12}>
        <UsersDetails />
      </Grid>
    </Grid>
  );
};

export default Users;
