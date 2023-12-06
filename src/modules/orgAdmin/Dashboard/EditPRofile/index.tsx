import { Box, Card, Grid } from '@mui/material';

import ProfileCard from '@/components/ProfileCard';
import CommonTabs from '@/components/Tabs';

import Profile from './Profile';
import Security from './Security';
import useDashboard from '../useDashboard';

const EditProfile = () => {
  const { tabVal, setTabVal } = useDashboard();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <ProfileCard
              userName="John Doe"
              role="Org Admin"
              email="Johndoe@gmail.com"
              phone="(316) 555-0116"
              editBtn={tabVal === 0 ? false : true}
              isBadge={true}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <CommonTabs
            getTabVal={(val: number) => setTabVal(val)}
            tabsArray={['Profile', 'Security']}
          >
            <Profile />
            <Security />
          </CommonTabs>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProfile;
