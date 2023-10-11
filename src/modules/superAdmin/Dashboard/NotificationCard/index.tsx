import React from 'react';
import { Grid, Box } from '@mui/material';
import PlanList from './PlanList';
import EventAndNotification from './EventsCard';

const NotificationCards = () => {
  return (
    <Box sx={{ paddingTop: '1rem' }}>
      <Grid container spacing={2}>
        <Grid item lg={7}>
          <PlanList />
        </Grid>
        <Grid item lg={5}>
          <EventAndNotification />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotificationCards;
