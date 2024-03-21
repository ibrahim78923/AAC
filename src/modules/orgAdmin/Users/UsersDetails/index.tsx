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
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_USERS_PERMISSIONS } from '@/constants/permission-keys';

const UsersDetails = (props: any) => {
  const { employeeDataById, searchAccount, setSearchAccount } = props;

  const {
    tabValue,
    setTabVal,
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    theme,
    handleChangeImg,
  } = useUsersDetails();

  const { data: profileData } = useGetUsersByIdQuery(employeeDataById);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PermissionsGuard
            permissions={[ORG_ADMIN_USERS_PERMISSIONS?.VIEW_USER_PROFILE]}
          >
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
              handleChangeImg={(e: any) => handleChangeImg(e, employeeDataById)}
            />
          </PermissionsGuard>
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
                getTabVal={(val: number) => {
                  setTabVal(val);
                  setSearchAccount('');
                }}
                tabsArray={['Accounts', 'Profile']}
                searchBarProps={{
                  label: 'Search Here',
                  setSearchBy: setSearchAccount,
                  searchBy: searchAccount,
                }}
                headerChildren={
                  <>
                    <PermissionsGuard
                      permissions={[ORG_ADMIN_USERS_PERMISSIONS?.ADD_ACCOUNTS]}
                    >
                      <Button
                        className="small"
                        variant="outlined"
                        color="inherit"
                        onClick={() => setIsOpenAddAccountDrawer(true)}
                        startIcon={<AddCircle />}
                      >
                        Add account
                      </Button>
                    </PermissionsGuard>
                  </>
                }
              >
                <PermissionsGuard
                  permissions={[
                    ORG_ADMIN_USERS_PERMISSIONS?.VIEW_COMPONY_ACCOUNTS,
                  ]}
                >
                  <Accounts
                    employeeDataById={employeeDataById}
                    searchAccount={searchAccount}
                  />
                </PermissionsGuard>

                <PermissionsGuard
                  permissions={[ORG_ADMIN_USERS_PERMISSIONS?.VIEW_USER_PROFILE]}
                >
                  <Profile
                    profileData={profileData?.data}
                    setTabVal={setTabVal}
                  />
                </PermissionsGuard>
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
