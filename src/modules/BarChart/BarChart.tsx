import React from 'react';
import { ApexOptions } from 'apexcharts';
import { Box, Grid } from '@mui/material';
import { CustomChart } from '@/components/Chart';
// =========================================================================
export default function BarChart() {
  const barseries: any = [44, 55, 13, 43, 22];
  const baroptions: ApexOptions = {
    labels: [
      'New',
      'Blacklisted',
      'Placed',
      'Approved',
      'Rejected',
      'Requested',
    ],
    colors: ['#FFC20E', '#FF4A4A', '#35A275', '#0AADC7'],
  };

  return (
    <Grid sx={{ px: { lg: 0, sm: 2, xs: 1 } }} container spacing={2}>
      <Grid item lg={6} md={6} xs={12}>
        <Box>
          <CustomChart
            options={baroptions}
            series={barseries}
            type="pie"
            height={380}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
