import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  Avatar,
  Card,
  Tooltip,
  Pagination,
} from '@mui/material';

import Search from '@/components/Search';

import ProfileCard from '@/components/ProfileCard';

import CommonTabs from '@/components/Tabs';

import { SUPER_ADMIN } from '@/constants';

import AddAccountDrawer from './AddAccountDrawer';

import AddUser from '../Users/AddUser';

import CompanyAccounts from './UserDetailsTables/CompanyAccounts';

import UserDetailsProfile from './UserDetailsProfile';

import Delegates from './UserDetailsTables/Delegates';

import { ArrowBack, AddCircleOutlined } from '@mui/icons-material';

import { FilterrIcon, RefreshTasksIcon } from '@/assets/icons';

import { NoAssociationFoundImage } from '@/assets/images';
import useUserDetailsList from './useUserDetailsList';
import useOrgUserDetailsList from '@/modules/orgAdmin/Users/UsersDetails/useUsersDetails';
import Filter from './Filter';
import AddCompanyDetails from './AddCompanyDetails';
import StatusBadge from '@/components/StatusBadge';
import { v4 as uuidv4 } from 'uuid';
import { useGetEmployeeListQuery } from '@/services/superAdmin/user-management/UserList';
import { useGetUsersByIdQuery } from '@/services/superAdmin/user-management/users';
import NoData from '@/components/NoData';
import { useSearchParams } from 'next/navigation';
import useUserManagement from '../useUserManagement';
import { IMG_URL } from '@/config';
import { useEffect } from 'react';

const UsersDetailsList = () => {
  const {
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenAddCompanyDrawer,
    setISOpenCompanyDrawer,
    handleCloseAddCompanyDrawer,
    handleAddUserDrawer,
    isOpenAdduserDrawer,
    setIsOpenAdduserDrawer,
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    tabVal,
    setTabVal,
    theme,
    navigate,
    employeeDataById,
    setEmployeeDataById,
    isActiveEmp,
    setIsActiveEmp,
    searchEmployee,
    setSearchEmployee,
    employeeFilter,
    setEmployeeFilter,
    resetFilters,
    handleEmpListPaginationChange,
    page,
    searchAccount,
    setSearchAccount,
  }: any = useUserDetailsList();

  const { handleUserSwitchChange } = useUserManagement();

  const { userName } = navigate.query;
  const organizationId = useSearchParams()?.get('organizationId');

  const employeeRecordsLimit = 10;

  const empListParams = {
    page: page,
    limit: employeeRecordsLimit,
    search: searchEmployee,
    product: employeeFilter?.product,
    company: employeeFilter?.company,
    status: employeeFilter?.status ? employeeFilter?.status : undefined,
  };
  const { data: employeeList } = useGetEmployeeListQuery({
    orgId: organizationId,
    values: empListParams,
  });
  const empDetail = employeeList?.data?.users;

  const { data: profileData } = useGetUsersByIdQuery(
    employeeDataById
      ? employeeDataById
      : employeeList?.data?.users && employeeList?.data?.users[0]?._id,
  );
  useEffect(() => {
    setEmployeeDataById(employeeList?.data?.users[0]?._id);
  }, [employeeList]);

  const { handleChangeImg } = useOrgUserDetailsList();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xl={3} lg={4} xs={12}>
          <Box
            sx={{
              padding: '24px 16px',
              borderRadius: '8px 0px 0px 8px',
              background: theme?.palette?.common?.white,
              minHeight: `calc(89vh - ${15}px)`,
            }}
          >
            <Box
              py={1}
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <Stack direction={'row'} gap={1} alignItems="center">
                <ArrowBack
                  onClick={() => {
                    navigate.push(SUPER_ADMIN.USERMANAGMENT);
                  }}
                  sx={{ cursor: 'pointer' }}
                />
                <Typography variant="h3">{userName}</Typography>
              </Stack>
              <Stack direction={{ sm: 'row' }} gap={1}>
                <Button
                  variant="outlined"
                  color="inherit"
                  className="small"
                  onClick={() => {
                    setIsOpenAdduserDrawer(true);
                  }}
                >
                  Add User
                  {/* <AddUserCircleIcon /> */}
                </Button>
                <Button
                  variant="outlined"
                  className="small"
                  color="inherit"
                  onClick={() => {
                    setISOpenCompanyDrawer(true);
                  }}
                >
                  Add Company
                  {/* <AddShopIcon /> */}
                </Button>
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Stack
                direction={{ sm: 'row', xs: 'column' }}
                justifyContent={'space-between'}
                alignItems={{ sm: 'center' }}
                gap={1}
              >
                <Search
                  placeholder="Search"
                  size="small"
                  onChange={(val: any) => setSearchEmployee(val?.target?.value)}
                />
                <Box gap={1} display="flex" justifyContent="flex-end">
                  <Tooltip title={'Refresh Filter'}>
                    <Button
                      variant="outlined"
                      color="inherit"
                      className="small"
                      onClick={resetFilters}
                    >
                      <RefreshTasksIcon />
                    </Button>
                  </Tooltip>
                  <Button
                    className="small"
                    sx={{
                      border: '1px solid grey',
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      height: '44px',
                    }}
                    onClick={() => setIsOpenDrawer(true)}
                  >
                    <FilterrIcon />
                  </Button>
                </Box>
              </Stack>
            </Box>
            {empDetail?.length === 0 && (
              <NoData
                image={NoAssociationFoundImage}
                message={'No data is available'}
              />
            )}
            <Box sx={{ height: `calc(62vh - ${15}px)`, overflow: 'auto' }}>
              {empDetail?.map((item: any, index: number) => (
                <Box
                  className="users-wrapper"
                  sx={{
                    my: 2,
                    backgroundColor:
                      isActiveEmp === index ? theme?.palette?.grey[400] : '',
                    borderRadius: '4px',
                    padding: '11px 8px',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                  key={uuidv4()}
                  onClick={() => {
                    setEmployeeDataById(item?._id);
                    setIsActiveEmp(index);
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      flexWrap: {
                        xs: 'wrap',
                        sm: 'nowrap',
                        lg: 'wrap',
                        xl: 'nowrap',
                      },
                    }}
                  >
                    <Avatar
                      src={`${IMG_URL}${item?.avatar?.url}`}
                      sx={{ color: theme?.palette?.grey[600], fontWeight: 500 }}
                    >
                      {`${item?.firstName?.charAt(0)}${item?.lastName?.charAt(
                        0,
                      )}`}
                    </Avatar>
                    <Box sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography>
                          {item?.firstName} {item?.lastName}
                        </Typography>
                        <StatusBadge
                          defaultValue={item?.status}
                          value={item?.status}
                          onChange={(e: any) =>
                            handleUserSwitchChange(e, item?._id)
                          }
                          options={[
                            {
                              label: 'Active',
                              value: 'ACTIVE',
                              color: theme?.palette?.success?.main,
                            },
                            {
                              label: 'Inactive',
                              value: 'INACTIVE',
                              color: theme?.palette?.error?.main,
                            },
                          ]}
                        />
                      </Box>
                      <Typography>{item?.email}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Pagination
              count={employeeList?.data?.meta?.pages}
              variant="outlined"
              shape="rounded"
              onChange={handleEmpListPaginationChange}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            />
          </Box>
        </Grid>
        <Grid item xl={9} lg={8} xs={12}>
          <Grid container spacing={2}>
            {empDetail?.length > 0 ? (
              <>
                <Grid item xs={12}>
                  <ProfileCard
                    userName={`${profileData?.data?.firstName} ${profileData?.data?.lastName}`}
                    isBadge={false}
                    email={profileData?.data?.email}
                    phone={profileData?.data?.phoneNumber}
                    handleEditProfile={() => setTabVal(1)}
                    src={`${
                      profileData?.data?.avatar
                        ? `${IMG_URL}${profileData?.data?.avatar?.url}`
                        : ''
                    }`}
                    handleChangeImg={(e: any) =>
                      handleChangeImg(e, employeeDataById)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    p="10px"
                    sx={{
                      borderRadius: '8px',
                      background: theme?.palette?.common?.white,
                      maxHeight: `calc(68vh - ${15}px)`,
                    }}
                  >
                    <Card sx={{ padding: '0px 24px' }}>
                      <CommonTabs
                        getTabVal={(val: number) => setTabVal(val)}
                        activeTab={tabVal}
                        searchBarProps={{
                          label: 'Search Here',
                          setSearchBy: setSearchAccount,
                          searchBy: searchAccount,
                        }}
                        isHeader={tabVal === 0 ? true : false}
                        tabsArray={['Company Accounts', 'Profile', 'Delegates']}
                        headerChildren={
                          <>
                            <Button
                              onClick={() => {
                                setIsOpenAddAccountDrawer(true);
                              }}
                              sx={{
                                border: `1px solid ${theme?.palette?.custom?.dark}`,
                                color: theme?.palette?.custom?.main,
                                width: '146px',
                                height: '36px',
                              }}
                              startIcon={<AddCircleOutlined />}
                            >
                              Add Account
                            </Button>
                          </>
                        }
                      >
                        <CompanyAccounts
                          organizationId={organizationId}
                          employeeDataById={employeeDataById}
                          searchAccount={searchAccount}
                        />
                        <UserDetailsProfile userDetails={profileData?.data} />
                        <Delegates />
                      </CommonTabs>
                    </Card>
                  </Box>
                </Grid>{' '}
              </>
            ) : (
              <NoData
                image={NoAssociationFoundImage}
                message={'No data is available'}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      {isOpenAddAccountDrawer && (
        <AddAccountDrawer
          isOpen={isOpenAddAccountDrawer}
          setIsOpen={setIsOpenAddAccountDrawer}
          organizationId={organizationId}
          userId={employeeDataById}
        />
      )}
      {isOpenDrawer && (
        <Filter
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
          employeeFilter={employeeFilter}
          setEmployeeFilter={setEmployeeFilter}
        />
      )}
      {isOpenAddCompanyDrawer && (
        <AddCompanyDetails
          isOpenDrawer={isOpenAddCompanyDrawer}
          onClose={handleCloseAddCompanyDrawer}
          organizationId={organizationId}
          setISOpenCompanyDrawer={setISOpenCompanyDrawer}
        />
      )}
      {isOpenAdduserDrawer && (
        <AddUser
          isOpenDrawer={isOpenAdduserDrawer}
          onClose={handleAddUserDrawer}
          organizationId={organizationId}
          setIsOpenAdduserDrawer={setIsOpenAdduserDrawer}
        />
      )}
    </Box>
  );
};

export default UsersDetailsList;
