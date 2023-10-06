import React, { useState } from 'react';

import { Box, Button, Grid, useTheme } from '@mui/material';

import ProfileCard from '@/components/ProfileCard';

import CommonTabs from '@/components/Tabs';

import CommonDrawer from '@/components/CommonDrawer';

import Accounts from './Accounts/Accounts';

import Profile from './Profile/Profile';

import AddAccount from '../Drawers/AddAccount';

import PlusShared from '@/assets/icons/shared/plus-shared';

const UsersDetails = () => {
  const [tabValue, setTabVal] = useState<number>();
  const [isOpenAddAccountDrawer, setIsOpenAddAccountDrawer] = useState(false);
  const theme = useTheme();

  return (
    <Box>
      <Grid container>
        <Grid lg={12}>
          <ProfileCard />
        </Grid>
        <Grid lg={12}>
          <CommonTabs
            isHeader={tabValue === 0 ? true : false}
            getTabVal={(val: number) => setTabVal(val)}
            tabsArray={['Accounts', 'Profile']}
            searchBarProps={{
              label: 'Search Here',
              width: '260px',
            }}
            headerChildren={
              <Button
                onClick={() => setIsOpenAddAccountDrawer(true)}
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: `${theme?.palette?.custom?.main}`,
                }}
                variant="outlined"
                startIcon={<PlusShared />}
              >
                Add account
              </Button>
            }
          >
            <Accounts />
            <Profile />
          </CommonTabs>
        </Grid>
      </Grid>
      {isOpenAddAccountDrawer && (
        <CommonDrawer
          isDrawerOpen={isOpenAddAccountDrawer}
          title="Add Account"
          okText="Add"
          submitHandler={() => {
            setIsOpenAddAccountDrawer(false);
          }}
          onClose={() => {
            setIsOpenAddAccountDrawer(false);
          }}
          isOk={true}
        >
          <AddAccount />
        </CommonDrawer>
      )}
    </Box>
  );
};

export default UsersDetails;
