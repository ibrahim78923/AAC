import { Box, Grid } from '@mui/material';

import StatisticsCard from './StatisticsCard';

import ScheduledSMS from './ScheduledSMS';

import SMSContacts from './SMSContacts';

import StatusCards from './StatusCards';

const SMSDashboard = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StatusCards />
        </Grid>
        <Grid item xs={12}>
          <StatisticsCard />
        </Grid>
        <Grid item lg={6} xs={12}>
          <ScheduledSMS />
        </Grid>
        <Grid item lg={6} xs={12}>
          <SMSContacts />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SMSDashboard;
