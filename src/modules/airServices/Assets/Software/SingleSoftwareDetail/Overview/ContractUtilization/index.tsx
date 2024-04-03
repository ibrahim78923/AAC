import { PieChart } from '@mui/x-charts/PieChart';
import { StyledText, styles } from './ContractUtilization.style';
import { Box, Skeleton, Typography } from '@mui/material';
import ApiErrorState from '@/components/ApiErrorState';
import { useContractUtilization } from './useContractUtilization';

function ContractUtilization(props: any) {
  const {
    contractUtilizationData,
    theme,
    contractUtilizationLabel,
    isLoading,
    isError,
    data,
    transformDataIfAllZero,
    width,
    height,
    left,
    top,
    isFetching,
  } = useContractUtilization(props);

  return (
    <>
      <Box sx={styles?.mainBox(theme)}>
        <Typography sx={styles?.heading}>
          {contractUtilizationLabel?.heading}
        </Typography>
        {isLoading || isFetching ? (
          <Box p={2}>
            <Skeleton height={250} />
          </Box>
        ) : isError ? (
          <ApiErrorState />
        ) : (
          <PieChart
            series={[
              {
                data: transformDataIfAllZero(contractUtilizationData),
                cx: styles?.alignGraph?.cx,
                cy: styles?.alignGraph?.cy,
                innerRadius: styles?.alignGraph?.innerRadius,
                outerRadius: styles?.alignGraph?.outerRadius,
                paddingAngle: styles?.alignGraph?.paddingAngle,
                cornerRadius: styles?.alignGraph?.cornerRadius,
                startAngle: styles?.alignGraph?.startAngle,
                endAngle: styles?.alignGraph?.endAngle,
              },
            ]}
            sx={styles?.chart}
            legend={{ hidden: true }}
            width={370}
            height={280}
          >
            <StyledText
              x={left + width / styles?.alignGraph?.numberLabelX}
              y={top + height / styles?.alignGraph?.numberLabelY}
            >
              {data?.data?.[0]?.contractUtilization}
            </StyledText>
            <StyledText
              x={left + width / styles?.alignGraph?.textLabelX}
              y={top + height / styles?.alignGraph?.textLabelY}
            >
              {contractUtilizationLabel?.textLabel}
            </StyledText>
          </PieChart>
        )}
        <Box sx={styles?.footerBox}>
          <Box sx={styles?.footerTypographyBox(theme)}>
            {data?.data?.[0]?.inActiveContracts}
          </Box>
          <Typography>Inactive</Typography>
          <Box sx={styles?.footerTypographyBox(theme)}>
            {data?.data?.[0]?.inActiveUsers}
          </Box>
          <Typography>Users</Typography>
        </Box>
      </Box>
    </>
  );
}

export default ContractUtilization;
