import React, { useState } from 'react';

import { Box, Button, Grid } from '@mui/material';

import ProfileCard from '@/components/ProfileCard';

import CommonTabs from '@/components/Tabs';

import CommonDrawer from '@/components/CommonDrawer';

import Accounts from './Accounts/Accounts';

import Profile from './Profile/Profile';

import AddAccount from './Drawers/AddAccount/AddAccount';

import PlusShared from '@/assets/icons/shared/plus-shared';

const UsersDetails = () => {
  const [tabValue, setTabVal] = useState<number>();
  const [oepnAddAccountDrawer, setOpenAddAccountDrawer] = useState(false);

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
                onClick={() => setOpenAddAccountDrawer(true)}
                sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
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
      {oepnAddAccountDrawer && (
        <CommonDrawer
          isDrawerOpen={oepnAddAccountDrawer}
          // setIsDrawerOpen={()=>{setOpenAddAccountDrawer(false)}}
          title="Add Account"
          okText="Add"
          submitHandler={() => {
            setOpenAddAccountDrawer(false);
          }}
          onClose={() => {
            setOpenAddAccountDrawer(false);
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
