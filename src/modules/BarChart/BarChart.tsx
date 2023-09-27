import React from 'react';
import { ApexOptions } from 'apexcharts';
import { Box, Grid } from '@mui/material';
import { CustomChart } from '@/components/Chart';
// =========================================================================
export default function BarChart() {
  const barseries: any = [
    {
      data: [12, 3, 40, 30, 5, 10],
    },
    {
      data: [44, 55, 41, 64, 22, 43, 21],
    },
    {
      data: [53, 32, 33, 52, 13, 44, 32],
    },
    {
      data: [12, 3, 40, 30, 5, 10],
    },
  ];
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
            type="bar"
            height={312}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
