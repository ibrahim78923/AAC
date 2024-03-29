import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, LinearProgress, Typography, useTheme } from '@mui/material';
import CustomBox from './CustomBox';
import { styles } from './Insight.style';

import useInsightCard from './useInsite';
import { CanlendarButtonIcon } from '@/assets/icons';
import { useGetTaskInsightsQuery } from '@/services/airSales/task';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { getSession } from '@/utils';

const Insights = () => {
  const { activity, dateRange, activityReportDate } = styles(useTheme());
  const { chartOptions, chartData } = useInsightCard();
  const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });
  const [datePickerVal, setDatePickerVal] = useState<any>();
  const [toggleDatePicker, setToggleDatePicker] = useState(false);

  const { user }: { accessToken: string; refreshToken: string; user: any } =
    getSession();

  const { data: taskInsightsData, isLoading } = useGetTaskInsightsQuery({
    params: {
      companyId: user?.organization?._id ? user?.organization?._id : '',
    },
  });
  // const { data: taskInsightsData, isLoading } = useGetTaskInsightsQuery({
  //   params: {
  //     companyId: user?.organization?._id ? user?.organization?._id : '',
  //   },
  // });
  const taskInsights = taskInsightsData?.data?.Pending;

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <Box>
          <Typography sx={activity}>Activity</Typography>
          <Typography sx={dateRange}>
            Date Range: This week so{' '}
            <Box onClick={() => setToggleDatePicker(!toggleDatePicker)}>
              <CanlendarButtonIcon />
            </Box>
          </Typography>

          <SwitchableDatepicker
            isCalendarOpen={toggleDatePicker}
            dateValue={datePickerVal}
            setDateValue={setDatePickerVal}
          />

          <CustomBox
            title={'CALL CONNECTED THIS WEEK'}
            count={taskInsights?.callCount || 0}
          />
          <CustomBox
            title={'MISSING COMPLETED THIS WEEK'}
            count={taskInsights?.total || 0}
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
            count={taskInsights?.emailCount || 0}
            desc={'Performance vs. previous week'}
          />
          <Typography variant="h5" mb={'10px'}>
            Task Performance
          </Typography>
          <Typography sx={activityReportDate}>
            Date Range: From{' '}
            {dayjs(datePickerVal ? datePickerVal[0] : Date.now())?.format(
              DATE_FORMAT?.API,
            )}{' '}
            to{' '}
            {dayjs(datePickerVal ? datePickerVal[1] : Date.now())?.format(
              DATE_FORMAT?.API,
            )}{' '}
            | Frequency: Daily
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
      )}
    </>
  );
};

export default Insights;
