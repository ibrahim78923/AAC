import Image from 'next/image';
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  Avatar,
  Card,
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

import { AddShopIcon, AddUserCircleIcon, FilterrIcon } from '@/assets/icons';

import { AvatarImage } from '@/assets/images';
import useUserDetailsList from './useUserDetailsList';
import Filter from './Filter';
import AddCompanyDetails from './AddCompanyDetails';
import StatusBadge from '@/components/StatusBadge';
import { v4 as uuidv4 } from 'uuid';
import useUserManagement from '../useUserManagement';

const UsersDetailsList = () => {
  const {
    handleCloseDrawer,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenAddCompanyDrawer,
    setISOpenCompanyDrawer,
    handleCloseAddCompanyDrawer,
    handleAddUserDrawer,
    isOpenAdduserDrawer,
    setIsOpenAdduserDrawer,
    userStatus,
    setUserStatus,
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    search,
    setSearch,
    tabVal,
    setTabVal,
    theme,
    navigate,
  }: any = useUserDetailsList();
  const { useGetUsersByIdQuery } = useUserManagement();
  const { id } = navigate.query;

  const { data } = useGetUsersByIdQuery(id);
  const userDetails = data?.data;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xl={3} lg={4} xs={12}>
          <Box
            sx={{
              padding: '24px 16px',
              borderRadius: '8px 0px 0px 8px',
              background: theme?.palette?.common?.white,
              minHeight: `calc(100% - ${0}px)`,
            }}
          >
            <Box
              py={1}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Stack direction={'row'} gap={1} alignItems="center">
                <ArrowBack
                  onClick={() => {
                    navigate.push(SUPER_ADMIN.USERMANAGMENT);
                  }}
                  sx={{ cursor: 'pointer' }}
                />
                <Typography variant="h3">
                  {userDetails?.firstName} {userDetails?.middleName}{' '}
                  {userDetails?.lastName}
                </Typography>
              </Stack>
              <Stack direction={'row'} gap={1}>
                <Button
                  sx={{
                    border: '1px solid grey',
                    height: '44px',
                    width: '44px',
                  }}
                  variant="outlined"
                  onClick={() => {
                    setIsOpenAdduserDrawer(true);
                  }}
                >
                  <AddUserCircleIcon />
                </Button>
                <Button
                  sx={{
                    border: '1px solid grey',
                    height: '44px',
                    width: '44px',
                  }}
                  variant="outlined"
                  onClick={() => {
                    setISOpenCompanyDrawer(true);
                  }}
                >
                  <AddShopIcon />
                </Button>
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Search placeholder="Search" size="small" />
                <Button
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
              </Stack>
            </Box>
            {data?.data?.users?.length === 0 && (
              <Typography>No user found</Typography>
            )}
            {data?.data?.users?.map((item: any) => (
              <Box
                className="users-wrapper"
                sx={{
                  my: 2,
                  backgroundColor: theme?.palette?.grey[400],
                  borderRadius: '4px',
                  padding: '11px 8px',
                  width: '100%',
                }}
                key={uuidv4()}
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
                  <Avatar>
                    <Image
                      src={AvatarImage}
                      alt="Avatar"
                      width={40}
                      height={40}
                    />
                  </Avatar>
                  <Box sx={{ width: '100%' }}>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Typography>
                        {item?.firstName} {item?.middleName} {item?.lastName}
                      </Typography>
                      <StatusBadge
                        defaultValue={item?.status}
                        value={userStatus}
                        onChange={(e: any) => setUserStatus(e?.target?.value)}
                        options={[
                          {
                            label: 'Active',
                            value: 'active',
                            color: theme?.palette?.success?.main,
                          },
                          {
                            label: 'Inactive',
                            value: 'inactive',
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
        </Grid>
        <Grid item xl={9} lg={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProfileCard
                userName={`${userDetails?.firstName} ${userDetails?.middleName} ${userDetails?.lastName}`}
                role={userDetails?.role}
                email={userDetails?.email}
                phone={userDetails?.phoneNumber}
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
                    getTabVal={(val: number) => setTabVal(val)}
                    searchBarProps={{
                      label: 'Search Here',
                      setSearchBy: setSearch,
                      searchBy: search,
                      width: '260px',
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
                    <CompanyAccounts />
                    <UserDetailsProfile />
                    <Delegates />
                  </CommonTabs>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isOpenAddAccountDrawer && (
        <AddAccountDrawer
          isOpen={isOpenAddAccountDrawer}
          setIsOpen={setIsOpenAddAccountDrawer}
        />
      )}
      {isOpenDrawer && (
        <Filter isOpenDrawer={isOpenDrawer} onClose={handleCloseDrawer} />
      )}
      {isOpenAddCompanyDrawer && (
        <AddCompanyDetails
          isOpenDrawer={isOpenAddCompanyDrawer}
          onClose={handleCloseAddCompanyDrawer}
        />
      )}
      {isOpenAdduserDrawer && (
        <AddUser
          isOpenDrawer={isOpenAdduserDrawer}
          onClose={handleAddUserDrawer}
        />
      )}
    </Box>
  );
};

export default UsersDetailsList;
