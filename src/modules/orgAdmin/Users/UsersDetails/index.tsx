import { Box, Button, Card, Grid } from '@mui/material';
import ProfileCard from '@/components/ProfileCard';
import CommonTabs from '@/components/Tabs';
import Accounts from './Accounts';
import Profile from './Profile';
import AddAccount from '../Drawers/AddAccount';
import useUsersDetails from './useUsersDetails';
import { AddCircle } from '@mui/icons-material';
import { useGetUsersByIdQuery } from '@/services/superAdmin/user-management/users';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_USERS_PERMISSIONS } from '@/constants/permission-keys';
import Search from '@/components/Search';
import SkeletonComponent from '@/components/CardSkeletons';
import useUsers from '../useUsers';
import { generateImage } from '@/utils/avatarUtils';
import { UsersDetailsProps } from './UsersDetails-interface';
import { indexNumbers } from '@/constants';
import { capitalizeFirstLetter } from '@/utils/api';
import { ROLES } from '@/constants/strings';

const UsersDetails = (props: UsersDetailsProps) => {
  const { employeeDataById, searchAccount, setSearchAccount } = props;
  const { employeeListLoading } = useUsers();

  const {
    tabValue,
    setTabVal,
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    theme,
    handleChangeImg,
  } = useUsersDetails();

  const { data: profileData, isLoading: profileDataLoading } =
    useGetUsersByIdQuery(employeeDataById, { skip: !employeeDataById });
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PermissionsGuard
            permissions={[ORG_ADMIN_USERS_PERMISSIONS?.VIEW_USER_PROFILE]}
          >
            <ProfileCard
              userName={`${
                capitalizeFirstLetter(profileData?.data?.firstName) ?? 'N/A'
              } ${capitalizeFirstLetter(profileData?.data?.lastName) ?? ''}`}
              isBadge={profileData?.data?.role === ROLES?.ORG_ADMIN && true}
              role={profileData?.data?.role}
              email={profileData?.data?.email}
              phone={profileData?.data?.phoneNumber}
              handleEditProfile={() => setTabVal(indexNumbers?.ONE)}
              isLoading={profileDataLoading}
              src={`${
                profileData?.data?.avatar
                  ? generateImage(profileData?.data?.avatar?.url)
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
              {employeeListLoading ? (
                <SkeletonComponent numberOfSkeletons={7} />
              ) : (
                <CommonTabs
                  isHeader={tabValue === indexNumbers?.ZERO ? true : false}
                  defaultValue={tabValue}
                  getTabVal={(val: number) => {
                    setTabVal(val);
                    setSearchAccount('');
                  }}
                  tabsArray={['Accounts', 'Profile']}
                  isSearchBar={
                    <Search
                      placeholder="Search by Name"
                      size="small"
                      setSearchBy={setSearchAccount}
                    />
                  }
                  headerChildren={
                    <>
                      <PermissionsGuard
                        permissions={[
                          ORG_ADMIN_USERS_PERMISSIONS?.ADD_ACCOUNTS,
                        ]}
                      >
                        <Button
                          className="small"
                          variant="outlined"
                          color="inherit"
                          onClick={() => setIsOpenAddAccountDrawer(true)}
                          startIcon={<AddCircle />}
                        >
                          Assign Account
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
                    permissions={[
                      ORG_ADMIN_USERS_PERMISSIONS?.VIEW_USER_PROFILE,
                    ]}
                  >
                    <Profile
                      profileData={profileData?.data}
                      setTabVal={setTabVal}
                    />
                  </PermissionsGuard>
                </CommonTabs>
              )}
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
