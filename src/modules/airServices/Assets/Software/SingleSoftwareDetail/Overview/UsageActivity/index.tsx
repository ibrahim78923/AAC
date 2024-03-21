import { PieChart } from '@mui/x-charts/PieChart';
import { StyledText, styles } from './UsageActivity.style';
import { Box, Skeleton, Typography } from '@mui/material';
import ApiErrorState from '@/components/ApiErrorState';
import { useUsageActivity } from './useUsageActivity';

function UsageActivity(props: any) {
  const {
    theme,
    usageActivityLabel,
    isLoading,
    isError,
    data,
    usageActivityData,
    width,
    height,
    left,
    top,
  } = useUsageActivity(props);

  return (
    <>
      <Box sx={styles.mainBox(theme)}>
        <Typography sx={styles?.heading}>
          {usageActivityLabel?.heading}
        </Typography>
        {isLoading ? (
          <Box p={2}>
            <Skeleton height={250} />
          </Box>
        ) : isError ? (
          <ApiErrorState />
        ) : (
          <PieChart
            series={[
              {
                data: usageActivityData?.map((item: any) => ({
                  ...item,
                  value:
                    data?.data?.usageActivity === 0
                      ? 1e-10
                      : data?.data?.usageActivity,
                })),
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
              {data?.data?.usageActivity}
            </StyledText>

            <StyledText
              x={left + width / styles?.alignGraph?.textLabelX}
              y={top + height / styles?.alignGraph?.textLabelY}
            >
              {usageActivityLabel?.textLabel}
            </StyledText>
          </PieChart>
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
