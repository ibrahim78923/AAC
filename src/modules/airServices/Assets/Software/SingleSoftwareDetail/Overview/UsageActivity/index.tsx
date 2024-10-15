import { styles } from './UsageActivity.style';
import { Box, Skeleton, Typography } from '@mui/material';
import ApiErrorState from '@/components/ApiErrorState';
import { useUsageActivity } from './useUsageActivity';
import { CustomChart } from '@/components/Chart';
import NoData from '@/components/NoData';

function UsageActivity() {
  const {
    theme,
    isLoading,
    isError,
    data,
    isFetching,
    usageChartData,
    chartOptions,
    totalUsersCount,
  } = useUsageActivity();

  return (
    <>
      <Box sx={styles?.mainBox(theme)}>
        <Typography sx={styles?.heading}>Usage Activity</Typography>
        {isLoading || isFetching ? (
          <Box p={2}>
            <Skeleton height={250} />
          </Box>
        ) : isError ? (
          <ApiErrorState />
        ) : totalUsersCount === 0 ? (
          <NoData height="70%" />
        ) : (
          <Box p={2.5}>
            <CustomChart
              options={chartOptions}
              series={usageChartData}
              type="donut"
              width={370}
              height={260}
            />
          </Box>
        )}
        <Box sx={styles?.footerBox}>
          <Box sx={styles?.footerTypographyBox(theme)}>
            {data?.data?.inActiveUsers}
          </Box>
          <Typography>Inactive</Typography>
        </Box>
      </Box>
    </>
  );
}

export default UsageActivity;
