import { useState } from 'react';

import Grid from '@mui/material/Grid';
import UsersTable from './UsersTable';
export const Users = () => {
  const [UsersData, setUsersData] = useState([]);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <UsersTable usersData={UsersData} setUsersData={setUsersData} />
        </Grid>
      </Grid>
    </>
  );
};
