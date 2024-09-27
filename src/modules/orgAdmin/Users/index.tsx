import { Box, Grid } from '@mui/material';
import UsersSidebar from './UsersSidebar';
import UsersDetails from './UsersDetails';
import useUsers from './useUsers';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';
import { indexNumbers } from '@/constants';

const Users = () => {
  const {
    employeeDataById,
    setEmployeeDataById,
    employeeDetails,
    searchAccount,
    setSearchAccount,
    setSearchEmployee,
    employeeFilter,
    setEmployeeFilter,
    resetFilter,
    handleEmpListPaginationChange,
    employeeMetaData,
  } = useUsers();

  return (
    <Grid container spacing={2}>
      <Grid item xl={3} lg={6} xs={12}>
        <UsersSidebar
          employeeDetails={employeeDetails}
          setSearchAccount={setSearchAccount}
          setEmployeeDataById={setEmployeeDataById}
          setSearchEmployee={setSearchEmployee}
          employeeFilter={employeeFilter}
          setEmployeeFilter={setEmployeeFilter}
          resetFilter={resetFilter}
          handleEmpListPaginationChange={handleEmpListPaginationChange}
          employeeMetaData={employeeMetaData}
        />
      </Grid>
      <Grid item xl={9} lg={6} xs={12}>
        {employeeDetails?.length > indexNumbers?.ZERO ? (
          <UsersDetails
            searchAccount={searchAccount}
            setSearchAccount={setSearchAccount}
            employeeDataById={employeeDataById}
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
