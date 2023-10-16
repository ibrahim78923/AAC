import { Grid, Typography } from '@mui/material';
import React from 'react';
import GraphCard from './GraphCard';
import NotificationCard from './NotificationCard';
import StatusCards from './StatusCard';

const Dashboard = () => {
  return (
    <>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h3">Dashboard</Typography>
        </Grid>
      </Grid>
      <StatusCards />
      <GraphCard />
      <NotificationCard />
    </>
  );
};

export default Dashboard;
