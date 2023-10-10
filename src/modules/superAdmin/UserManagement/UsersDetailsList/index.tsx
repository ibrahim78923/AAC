import React, { useState } from 'react';

import Image from 'next/image';

import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
  Avatar,
} from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

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

import {
  AddShopIcon,
  AddUserCircleIcon,
  FilterSharedIcon,
} from '@/assets/icons';

import { AvatarImage } from '@/assets/images';

const UsersDetailsList = () => {
  const [isOpenAdduserDrawer, setIsOpenAdduserDrawer] = useState(false);
  const [isOpenAddAccountDrawer, setIsOpenAddAccountDrawer] = useState(false);
  const [search, setSearch] = useState('');
  const [tabVal, setTabVal] = useState<number>();
  const theme = useTheme();
  const navigate = useRouter();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={2.5}>
          <Box>
            <Box
              py={1}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Stack direction={'row'} alignItems={'center'}>
                <ArrowBack
                  onClick={() => {
                    navigate.push(SUPER_ADMIN.USERMANAGMENT);
                  }}
                  sx={{ cursor: 'pointer' }}
                />
                <Typography variant="h3">Olivia</Typography>
              </Stack>
              <Stack direction={'row'} gap={1}>
                <Button
                  sx={{
                    border: '1px solid grey',
                    height: '44px',
                    width: '44px',
                  }}
                  variant="outlined"
                >
                  <AddShopIcon />
                </Button>
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
              </Stack>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Search placeholder="Search" />
              <Button
                sx={{
                  border: '1px solid grey',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  height: '44px',
                }}
              >
                <FilterSharedIcon />
              </Button>
            </Stack>
          </Box>
          <Box
            className="users-wrapper"
            sx={{
              my: 2,
              backgroundColor: theme.palette.grey[400],
              borderRadius: '4px',
              padding: '11px 8px',
            }}
          >
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Avatar>
                <Image src={AvatarImage} alt="Avatar" width={40} height={40} />
              </Avatar>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Roberts Rohan</Typography>
                  <Typography>active</Typography>
                </Box>
                <Typography>Robert@airapplecart.co.uk</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={9.5}>
          <ProfileCard />
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
        </Grid>
      </Grid>

      {isOpenAdduserDrawer && (
        <CommonDrawer
          isDrawerOpen={isOpenAdduserDrawer}
          submitHandler={() => {
            setIsOpenAdduserDrawer(false);
          }}
          onClose={() => {
            setIsOpenAdduserDrawer(false);
          }}
          title="Add User"
          okText="Add"
          isOk={true}
        >
          <AddUser />
        </CommonDrawer>
      )}

      {isOpenAddAccountDrawer && (
        <AddAccountDrawer
          isOpen={isOpenAddAccountDrawer}
          setIsOpen={setIsOpenAddAccountDrawer}
        />
      )}
    </Box>
  );
};

export default UsersDetailsList;
