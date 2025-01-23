import { styles } from './UsageActivity.style';
import { Box, Typography } from '@mui/material';
import { useUsageActivity } from './useUsageActivity';
import { CustomChart } from '@/components/Chart';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';

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
    refetch,
  } = useUsageActivity();

  return (
    <>
      <Box sx={styles?.mainBox(theme)}>
        <Typography sx={styles?.heading}>Usage Activity</Typography>
        <ApiRequestFlow
          showSkeleton={isLoading || isFetching}
          hasError={isError}
          skeletonType={SKELETON_TYPES?.BARS}
          errorHeight="100%"
          refreshApi={refetch}
          hasNoData={totalUsersCount == SELECTED_ARRAY_LENGTH?.ZERO}
        >
          <Box p={2.5}>
            <CustomChart
              options={chartOptions}
              series={usageChartData}
              type="donut"
              width={370}
              height={260}
            />
          </Box>
          <Box sx={styles?.footerBox}>
            <Box sx={styles?.footerTypographyBox(theme)}>
              {data?.data?.inActiveUsers}
            </Box>
            <Typography>Inactive</Typography>
          </Box>
        </ApiRequestFlow>
      </Box>
    </>
  );
}

export default UsageActivity;
