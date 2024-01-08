import { Box, Button, Card, Grid } from '@mui/material';
import ProfileCard from '@/components/ProfileCard';
import CommonTabs from '@/components/Tabs';
import Accounts from './Accounts';
import Profile from './Profile';
import AddAccount from '../Drawers/AddAccount';
import useUsersDetails from './useUsersDetails';
import { AddCircle } from '@mui/icons-material';
import { useGetUsersByIdQuery } from '@/services/superAdmin/user-management/users';
import { IMG_URL } from '@/config';

const UsersDetails = (props: any) => {
  const { employeeDataById } = props;

  const {
    tabValue,
    setTabVal,
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    theme,
    handleChangeImg,
    searchAccount,
    setSearchAccount,
  } = useUsersDetails(employeeDataById);

  const { data: profileData } = useGetUsersByIdQuery(employeeDataById);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProfileCard
            userName={`${profileData?.data?.firstName ?? 'N/A'} ${
              profileData?.data?.lastName ?? ''
            }`}
            isBadge={false}
            email={profileData?.data?.email}
            phone={profileData?.data?.phoneNumber}
            handleEditProfile={() => setTabVal(1)}
            src={`${
              profileData?.data?.avatar
                ? `${IMG_URL}${profileData?.data?.avatar?.url}`
                : ''
            }`}
            handleChangeImg={handleChangeImg}
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
                searchBarProps={{
                  label: 'Search Here',
                  setSearchBy: setSearchAccount,
                  searchBy: searchAccount,
                }}
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
                <Accounts
                  employeeDataById={employeeDataById}
                  searchAccount={searchAccount}
                />
                <Profile profileData={profileData?.data} />
              </CommonTabs>
            </Card>
          </Box>
        </Grid>
      </Grid>
      {isOpenAddAccountDrawer && (
        <AddAccount
          employeeDataById={employeeDataById}
          isOpen={isOpenAddAccountDrawer}
          setIsOpenAddAccountDrawer={setIsOpenAddAccountDrawer}
        />
      )}
    </Box>
  );
};

export default UsersDetails;
