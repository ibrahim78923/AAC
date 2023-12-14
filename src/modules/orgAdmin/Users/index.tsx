import { Grid } from '@mui/material';

import UsersSidebar from './UsersSidebar';

import UsersDetails from './UsersDetails';
import useUsers from './useUsers';

const Users = () => {
  const { employeeDataById, setEmployeeDataById } = useUsers();
  return (
    <Grid container spacing={2}>
      <Grid item xl={3} lg={4} xs={12}>
        <UsersSidebar
          employeeDataById={employeeDataById}
          setEmployeeDataById={setEmployeeDataById}
        />
      </Grid>
      <Grid item xl={9} lg={8} xs={12}>
        <UsersDetails
          employeeDataById={employeeDataById}
          setEmployeeDataById={setEmployeeDataById}
        />
      </Grid>
    </Grid>
  );
};

export default Users;
