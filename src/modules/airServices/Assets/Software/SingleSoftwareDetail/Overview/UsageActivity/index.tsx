import { useDrawingArea } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';
import { StyledText, styles } from './UsageActivity.style';
import { Box, Typography, useTheme } from '@mui/material';

function UsageActivity({ usageActivityLabel, usageActivityData }: any) {
  const theme: any = useTheme();
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
      <Box sx={styles.mainBox(theme)}>
        <Typography sx={styles?.heading}>
          {usageActivityLabel?.heading}
        </Typography>
        <PieChart
          series={[
            {
              data: usageActivityData,
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
            {usageActivityLabel?.numLabel}
          </StyledText>

          <StyledText
            x={left + width / styles?.alignGraph?.textLabelX}
            y={top + height / styles?.alignGraph?.textLabelY}
          >
            {usageActivityLabel?.textLabel}
          </StyledText>
        </PieChart>
        <Box sx={styles?.footerBox}>
          <Box sx={styles?.footerTypographyBox(theme)}>
            {usageActivityLabel?.inactive}
          </Box>
          <Typography>Inactive</Typography>
        </Box>
      </Box>
    </>
  );
}

export default UsageActivity;
