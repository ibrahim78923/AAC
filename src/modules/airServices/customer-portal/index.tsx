import React from 'react';
import { Header } from './Header';
import { WelcomeCard } from './WelcomeCard';
import { PopularArticles } from './PopularArticles';
import { PendingApprovals } from './PendingApprovals';
import {
  announcementsData,
  articlesData,
  pendingApprovalData,
  recentTicketsData,
  ticketsData,
  ticketsTypeList,
} from './CustomerPortal.data';
import { RecentTickets } from './RecentTickets';
import { Announcements } from './Announcements';
import { Grid } from '@mui/material';

const CustomerPortal = () => {
  return (
    <>
      <Header />
      <br />
      <WelcomeCard
        ticketsData={ticketsData}
        ticketsTypeList={ticketsTypeList}
      />
      <br />
      <Grid container rowSpacing={1.6} columnSpacing={2.4}>
        <Grid item xs={12} lg={6}>
          <PopularArticles articles={articlesData} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <PendingApprovals pendingApprovalData={pendingApprovalData} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RecentTickets recentTicketsData={recentTicketsData} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Announcements announcementsData={announcementsData} />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomerPortal;
