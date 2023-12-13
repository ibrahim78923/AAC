import { Box, Button, Card, Grid } from '@mui/material';

import ProfileCard from '@/components/ProfileCard';

import CommonTabs from '@/components/Tabs';

import Accounts from './Accounts';

import Profile from './Profile';

import AddAccount from '../Drawers/AddAccount';

import useUsersDetails from './useUsersDetails';

import { AddCircle } from '@mui/icons-material';
import useUsers from '../useUsers';
import { useGetUsersByIdQuery } from '@/services/superAdmin/user-management/users';

const UsersDetails = (props: any) => {
  const { employeeDataById } = props;
  const {
    tabValue,
    setTabVal,
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    theme,
  } = useUsersDetails();
  const { employeeList } = useUsers();

  const { data: profileData } = useGetUsersByIdQuery(
    employeeDataById ? employeeDataById : employeeList?.data?.users[0]?._id,
  );

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProfileCard
            userName={`${profileData?.data?.firstName} ${profileData?.data?.lastName}`}
            role={profileData?.data?.role}
            email={profileData?.data?.email}
            phone={profileData?.data?.phoneNumber}
            handleEditProfile={() => setTabVal(1)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            p="10px"
            sx={{
              borderRadius: '8px',
              background: theme?.palette?.common?.white,
            }}
          >
            <Card sx={{ padding: '0px 24px' }}>
              <CommonTabs
                isHeader={tabValue === 0 ? true : false}
                activeTab={tabValue}
                getTabVal={(val: number) => setTabVal(val)}
                tabsArray={['Accounts', 'Profile']}
                searchBarProps={{ label: 'Search Here' }}
                headerChildren={
                  <Button
                    className="small"
                    variant="outlined"
                    color="inherit"
                    onClick={() => setIsOpenAddAccountDrawer(true)}
                    startIcon={<AddCircle />}
                  >
                    Add account
                  </Button>
                }
              >
                <Accounts />
                <Profile />
              </CommonTabs>
            </Card>
          </Box>
        </Grid>
      </Grid>
      {isOpenAddAccountDrawer && (
        <AddAccount
          isOpen={isOpenAddAccountDrawer}
          setIsOpen={() => {
            setIsOpenAddAccountDrawer(false);
          }}
        />
      )}
    </Box>
  );
};

export default UsersDetails;
