import React from 'react';
import { Grid } from '@mui/material';
import StatisticsCard from './StatisticsCard';
import EnquiriesCard from './EnquiresCard';
import InvoicingCard from './InvoicingCard';

const GraphCard = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <StatisticsCard />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={6} xs={12}>
              <EnquiriesCard />
            </Grid>
            <Grid item lg={12} md={12} sm={6} xs={12}>
              <InvoicingCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GraphCard;
