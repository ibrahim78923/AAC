import { styles } from './ContractUtilization.style';
import { Box, Skeleton, Typography } from '@mui/material';
import ApiErrorState from '@/components/ApiErrorState';
import { useContractUtilization } from './useContractUtilization';
import { ARRAY_INDEX } from '@/constants/strings';
import { CustomChart } from '@/components/Chart';
import NoData from '@/components/NoData';

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
  } = useContractUtilization();

  return (
    <>
      <Box sx={styles?.mainBox(theme)}>
        <Typography sx={styles?.heading}>Contract Utilization</Typography>
        {isLoading || isFetching ? (
          <Box p={2}>
            <Skeleton height={250} />
          </Box>
        ) : isError ? (
          <ApiErrorState />
        ) : totalCount === 0 ? (
          <NoData height="70%" />
        ) : (
          <CustomChart
            options={options}
            series={contractUtilizationChartData}
            type={'radialBar'}
            width={390}
            height={310}
          />
        )}
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
      </Box>
    </>
  );
}

export default ContractUtilization;
