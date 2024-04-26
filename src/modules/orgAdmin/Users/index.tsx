import { Box, Grid } from '@mui/material';
import UsersSidebar from './UsersSidebar';
import UsersDetails from './UsersDetails';
import useUsers from './useUsers';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';

const Users = () => {
  const {
    employeeDataById,
    setEmployeeDataById,
    employeeDetails,
    searchAccount,
    setSearchAccount,
  } = useUsers();

  return (
    <Grid container spacing={2}>
      <Grid item xl={3} lg={4} xs={12}>
        <UsersSidebar
          setSearchAccount={setSearchAccount}
          employeeDataById={employeeDataById}
          setEmployeeDataById={setEmployeeDataById}
        />
      </Grid>
      <Grid item xl={9} lg={8} xs={12}>
        {employeeDetails?.length > 0 ? (
          <UsersDetails
            searchAccount={searchAccount}
            setSearchAccount={setSearchAccount}
            employeeDataById={employeeDataById}
            setEmployeeDataById={setEmployeeDataById}
          />
        ) : (
          <Box mt={10}>
            <NoData
              image={NoAssociationFoundImage}
              message={'No data is available'}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Users;
