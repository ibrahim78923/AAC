import React from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { CompainDetailsCard } from './ViewCompaignDetails.data';
import { v4 as uuidv4 } from 'uuid';

const ViewCompaignDetails = () => {
  return (
    <Card sx={{ padding: '10px 10px' }}>
      <Grid container>
        {CompainDetailsCard?.map(
          (performance: { headingName: string; detail: string }) => {
            return (
              <Grid item md={1.71} key={uuidv4()}>
                <Typography>{performance?.headingName}</Typography>
                <Typography>{performance?.detail}</Typography>
              </Grid>
            );
          },
        )}
      </Grid>
    </Card>
  );
};
export default ViewCompaignDetails;
