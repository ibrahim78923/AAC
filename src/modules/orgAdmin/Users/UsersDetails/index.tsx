import { Box, Button, Card, Grid } from '@mui/material';

import ProfileCard from '@/components/ProfileCard';

import CommonTabs from '@/components/Tabs';

import Accounts from './Accounts';

import Profile from './Profile';

import ControlPointIcon from '@mui/icons-material/ControlPoint';

import AddAccount from '../Drawers/AddAccount';
import useUsersDetails from './useUsersDetails';

const UsersDetails = () => {
  const {
    tabValue,
    setTabVal,
    isOpenAddAccountDrawer,
    setIsOpenAddAccountDrawer,
    theme,
  } = useUsersDetails();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProfileCard isBadge={false} />
        </Grid>
        <Grid item xs={12}>
          <Box p="10px" sx={{ borderRadius: '8px', background: '#ffff' }}>
            <Card sx={{ padding: '0px 24px' }}>
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
            </Card>
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
