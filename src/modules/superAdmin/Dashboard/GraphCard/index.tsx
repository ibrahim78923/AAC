import React from 'react';
import { Grid } from '@mui/material';
import StatisticsCard from './StatisticsCard';
import EnquiriesCard from './EnquiresCard';
import InvoicingCard from './InvoicingCard';

const GraphCard = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <StatisticsCard />
        </Grid>
        <Grid item lg={6}>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <EnquiriesCard />
            </Grid>
            <Grid item lg={12}>
              <InvoicingCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GraphCard;
