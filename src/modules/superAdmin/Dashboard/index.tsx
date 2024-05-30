import { Grid, Typography } from '@mui/material';
import React from 'react';
import GraphCard from './GraphCard';
import NotificationCard from './NotificationCard';
import StatusCards from './statusCard';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const {
    billingDetailsLoading,
    plansStatsLoading,
    userStatsLoading,
    planStatistics,
    billingDetails,
    allUsersStats,
    totalClients,
    totalUsers,
    plansList,
    theme,
  } = useDashboard();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3">Dashboard</Typography>
        </Grid>
      </Grid>
      <StatusCards
        theme={theme}
        isLoading={userStatsLoading}
        data={allUsersStats}
        totalClients={totalClients}
        totalUsers={totalUsers}
        billingData={billingDetails}
        billingDataLoading={billingDetailsLoading}
      />
      <GraphCard
        planStats={planStatistics}
        planStatLoading={plansStatsLoading}
        billingData={billingDetails}
        billingDataLoading={billingDetailsLoading}
      />
      <Grid container>
        <Grid item xs={12}>
          <NotificationCard plansList={plansList} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
