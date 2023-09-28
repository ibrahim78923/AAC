import ProfileCard from '@/components/ProfileCard';
import CommonTabs from '@/components/Tabs';
import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import Accounts from './Accounts/Accounts';
import Profile from './Profile/Profile';
import PlusShared from '@/assets/icons/shared/plus-shared';

const UsersDetails = () => {
  return (
    <Box>
      <Grid container>
        <Grid lg={12}>
          <ProfileCard />
        </Grid>
        <Grid lg={12}>
          <CommonTabs
            isHeader={true}
            tabsArray={['Accounts', 'Profile']}
            searchBarProps={{
              label: 'Search Here',
              width: '260px',
            }}
            headerChildren={
              <Button
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
    </Box>
  );
};

export default UsersDetails;
