import { Grid, Typography } from '@mui/material';
import React from 'react';
import GraphCard from './GraphCard';
import StatusCards from './statusCard';
import NotificationCards from './NotificationCard';

const SuperAdminDashboard = () => {
  return (
    <>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h3">Dashboard</Typography>
        </Grid>
      </Grid>
      <StatusCards />
      <GraphCard />
      <NotificationCards />
    </>
  );
};

export default SuperAdminDashboard;
