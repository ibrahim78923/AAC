import React from 'react';
import { Grid, Card, Typography } from '@mui/material';
import { CompainDetailsCard } from './ViewCompaignDetails.data';
import { v4 as uuidv4 } from 'uuid';

const ViewCompaignDetails = () => {
  return (
    <Card sx={{ padding: '24px', margin: '15px' }}>
      <Grid container spacing={2}>
        {CompainDetailsCard?.map(
          (performance: { headingName: string; detail: string }) => {
            return (
              <Grid item md={1.71} key={uuidv4()}>
                <Typography variant="body1" fontWeight={500}>
                  {performance?.headingName}
                </Typography>
                <Typography variant="body2" mt={1.5}>
                  {performance?.detail}
                </Typography>
              </Grid>
            );
          },
        )}
      </Grid>
    </Card>
  );
};
export default ViewCompaignDetails;
