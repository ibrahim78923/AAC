import { styles } from './ContractUtilization.style';
import { Box, Typography } from '@mui/material';
import { useContractUtilization } from './useContractUtilization';
import { ARRAY_INDEX, SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { CustomChart } from '@/components/Chart';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

function ContractUtilization() {
  const {
    theme,
    isLoading,
    isError,
    data,
    isFetching,
    options,
    contractUtilizationChartData,
    totalCount,
    refetch,
  } = useContractUtilization();

  return (
    <>
      <Box sx={styles?.mainBox(theme)}>
        <Typography sx={styles?.heading}>Contract Utilization</Typography>
        <ApiRequestFlow
          showSkeleton={isLoading || isFetching}
          hasError={isError}
          skeletonType={SKELETON_TYPES?.BARS}
          errorHeight="100%"
          refreshApi={refetch}
          hasNoData={totalCount === SELECTED_ARRAY_LENGTH?.ZERO}
        >
          <CustomChart
            options={options}
            series={contractUtilizationChartData}
            type={'radialBar'}
            width={390}
            height={310}
          />
          <Box sx={styles?.footerBox}>
            <Box sx={styles?.footerTypographyBox(theme)}>
              {data?.data?.[ARRAY_INDEX?.ZERO]?.inActiveContracts}
            </Box>
            <Typography>Inactive</Typography>
            <Box sx={styles?.footerTypographyBox(theme)}>
              {data?.data?.[ARRAY_INDEX?.ZERO]?.inActiveUsers}
            </Box>
            <Typography>Users</Typography>
          </Box>
        </ApiRequestFlow>
      </Box>
    </>
  );
}

export default ContractUtilization;
