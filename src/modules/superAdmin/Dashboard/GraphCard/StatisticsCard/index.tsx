import React from 'react';

import dynamic from 'next/dynamic';

import { Box, Typography } from '@mui/material';

import { styles } from './StatisticsCard.style';

const StatisticsCard = () => {
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  const series = [
    {
      name: 'Growth Plan',
      data: [44, 55, 57, 56, 61],
    },
    {
      name: 'Premium Plan',

      data: [76, 85, 101, 98, 87],
    },
    {
      name: 'Enterprise Plan',
      data: [35, 41, 36, 26, 45],
    },
    {
      name: 'Enterprise Plan',
      data: [30, 25, 30, 20, 35],
    },
  ];

  const options: any = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
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
        'Air Sales',
        'Air Marketer ',
        'Air Services',
        'Air Operations',
        'Loyalty Program',
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
      <Box sx={styles.staticCardStyle}>
        <Typography variant="body2" sx={{ color: '#030229', fontWeight: 600 }}>
          Plan Statistics
        </Typography>
        <Box>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={450}
          />
        </Box>
      </Box>
    </>
  );
};

export default StatisticsCard;
