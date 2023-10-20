import React from 'react';

import dynamic from 'next/dynamic';

import { Box, Grid, Typography } from '@mui/material';

const CardAndGraphs = () => {
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  const series = [28, 18, 54];
  const colors = ['#FF4A4A', '#47B263', '#0AADC7'];
  const options: any = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Loss', 'Win', 'Open'],
    colors: colors,

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const seriesBar = [
    {
      data: [21],
    },
    {
      data: [76],
    },
    {
      data: [81],
    },
    {
      data: [30, 25],
    },
    {
      name: 'May',
      data: [22, 21, 32, 21, 21],
    },
  ];

  const optionsBar: any = {
    chart: {
      type: 'bar',
      height: 30,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        endingShape: 'rounded',
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },

    xaxis: {
      categories: [
        'Jan',
        'Feb ',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },

    fill: {
      opacity: 1,
    },

    tooltip: {
      y: {
        formatter: function (val: any) {
          return '$ ' + val + ' thousands';
        },
      },
    },
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={4} md={6} sm={12} xs={12}>
          <Box
            sx={{
              border: '1px solid #FF4A4A',
              background: '#FFE8E8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <Typography variant="h6" sx={{ color: '#374151' }}>
              Total Deals
            </Typography>
            <Typography variant="h3" sx={{ color: '#000000', fontWeight: 500 }}>
              6
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Box
            sx={{
              border: '1px solid #47B263',
              background: '#ECFFF1',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <Typography variant="h6" sx={{ color: '#374151' }}>
              Open Deals
            </Typography>
            <Typography variant="h3" sx={{ color: '#000000', fontWeight: 500 }}>
              3
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={4} md={6} sm={6} xs={12}>
          <Box
            sx={{
              border: '1px solid #0AADC7',
              background: '#ECFCFF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <Typography variant="h6" sx={{ color: '#374151' }}>
              Close Deals
            </Typography>
            <Typography variant="h3" sx={{ color: '#000000', fontWeight: 500 }}>
              3
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
        <Grid item lg={6}>
          <Box
            sx={{
              border: '1px solid #EAECF0',
              padding: '2rem',
              borderRadius: '8px',
            }}
          >
            <ReactApexChart
              options={optionsBar}
              series={seriesBar}
              type="bar"
              height={350}
            />
          </Box>
        </Grid>
        <Grid item lg={6}>
          <Box
            sx={{
              border: '1px solid #EAECF0',
              padding: '2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
            }}
          >
            <ReactApexChart
              options={options}
              series={series}
              type="pie"
              width={380}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CardAndGraphs;
