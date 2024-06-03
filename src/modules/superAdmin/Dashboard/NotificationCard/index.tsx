import React from 'react';
import { Grid, Box } from '@mui/material';
import PlanList from './PlanList';
import EventCards from './EventsCard';

const NotificationCard = (plansList: any) => {
  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
          <PlanList data={plansList} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <EventCards />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotificationCard;
