import React, { useState } from 'react';

import { Box, Button, Grid, useTheme } from '@mui/material';

import ProfileCard from '@/components/ProfileCard';

import CommonTabs from '@/components/Tabs';

import Accounts from './Accounts';

import Profile from './Profile';

import ControlPointIcon from '@mui/icons-material/ControlPoint';

import AddAccount from '../Drawers/AddAccount';

const UsersDetails = () => {
  const [tabValue, setTabVal] = useState<number>();
  const [isOpenAddAccountDrawer, setIsOpenAddAccountDrawer] = useState(false);
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <ProfileCard isBadge={false} />
        </Grid>
        <Grid item lg={12}>
          <Box p="24px" sx={{ borderRadius: '8px 0px 0px 8px' }}>
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
                  startIcon={<ControlPointIcon />}
                >
                  Add account
                </Button>
              }
            >
              <Accounts />
              <Profile />
            </CommonTabs>
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
