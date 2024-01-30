import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, useTheme } from '@mui/material';
import CustomBox from './CustomBox';
import { styles } from './Insight.style';

import useInsightCard from './useInsite';
import { CanlendarButtonIcon } from '@/assets/icons';

const Insights = () => {
  const { activity, dateRange, activityReportDate } = styles(useTheme());
  const { chartOptions, chartData } = useInsightCard();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  return (
    <Box>
      <Typography sx={activity}>Activities</Typography>
      <Typography sx={dateRange}>
        Date Range: This week so <CanlendarButtonIcon />
      </Typography>
      <CustomBox title={'CALL CONNECTED THIS WEEK'} count={0} />
      <CustomBox
        title={'MISSING COMPLETED THIS WEEK'}
        count={0}
        desc={'Date Range: This week so  | Compared To: Last week'}
      />
      <Typography variant="subtitle2" mb={'10px'}>
        Weekly activity report
      </Typography>
      <Typography sx={activityReportDate}>
        Date Range: This week so | Compared To: Last week
      </Typography>
      <CustomBox
        title={'EMAIL SENT TO CONTACT'}
        count={1}
        desc={'Performance vs. previous week'}
      />
      <Typography variant="subtitle2" mb={'10px'}>
        Task Performance
      </Typography>
      <Typography sx={activityReportDate}>
        Date Range: From 22-03-2023 to 25-03-2023 | Frequency: Daily
      </Typography>
      <Box mt={2}>
        <ReactApexChart
          options={chartOptions}
          series={[{ data: chartData }]}
          type="bar"
          height={450}
        />
      </Box>
    </Box>
  );
};

export default Insights;
