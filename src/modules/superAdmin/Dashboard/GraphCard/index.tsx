import React from 'react';
import { Grid } from '@mui/material';
import StatisticsCard from './StatisticsCard';
import EnquiriesCard from './EnquiresCard';
import InvoicingCard from './InvoicingCard';
import { GraphCardPropsI } from '@/modules/superAdmin/Dashboard/Dashboard-interface';

const GraphCard = ({
  planStats,
  planStatLoading,
  billingData,
  billingDataLoading,
  enquiriesData,
  enquiriesDataLoading,
}: GraphCardPropsI) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <StatisticsCard data={planStats} isLoading={planStatLoading} />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <EnquiriesCard
                details={enquiriesData}
                isLoading={enquiriesDataLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <InvoicingCard
                details={billingData}
                isLoading={billingDataLoading}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GraphCard;
