import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Typography, useTheme } from '@mui/material';
import CustomBox from './CustomBox';
import { styles } from './Insight.style';

const Insights = () => {
  const { activity, dateRange, activityReportDate } = styles(useTheme());
  return (
    <Box>
      <Typography sx={activity}>Activity</Typography>
      <Typography sx={dateRange}>
        Date Range: This week so <ArrowDropDownIcon />
      </Typography>
      <CustomBox title={'CALL CONNECTED THIS WEEK'} count={0} />
      <CustomBox
        title={'MISSING COMPLETED THIS WEEK'}
        count={0}
        desc={'Date Range: This week so  | Compared To: Last week'}
      />
      <Typography variant="h5" mb={'10px'}>
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
      <Typography variant="h5" mb={'10px'}>
        Task Performance
      </Typography>
      <Typography sx={activityReportDate}>
        Date Range: From 22-03-2023 to 25-03-2023 | Frequency: Daily
      </Typography>
    </Box>
  );
};

export default Insights;
