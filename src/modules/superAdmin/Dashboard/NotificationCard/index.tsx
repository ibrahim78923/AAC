import React from 'react';
import { Grid, Box } from '@mui/material';
import PlanList from './PlanList';
import EventCards from './EventsCard';

const NotificationCard = () => {
  return (
    <Box sx={{ paddingTop: '1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          <PlanList />
        </Grid>
        <Grid item xs={12} lg={5}>
          <EventCards />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotificationCard;
