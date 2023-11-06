import { useDrawingArea } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';
import { StyledText, styles } from './ContractUtilization.style';
import { Box, Typography, useTheme } from '@mui/material';

function ContractUtilization({
  contractUtilizationData,
  contractUtilizationLabel,
}: any) {
  const theme: any = useTheme();
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
      <Box sx={styles?.mainBox(theme)}>
        <Typography sx={styles?.heading}>
          {contractUtilizationLabel?.heading}
        </Typography>
        <PieChart
          series={[
            {
              data: contractUtilizationData,
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
            {contractUtilizationLabel?.numLabel}
          </StyledText>
          <StyledText
            x={left + width / styles?.alignGraph?.textLabelX}
            y={top + height / styles?.alignGraph?.textLabelY}
          >
            {contractUtilizationLabel?.textLabel}
          </StyledText>
        </PieChart>
        <Box sx={styles?.footerBox}>
          <Box sx={styles?.footerTypographyBox(theme)}>
            {contractUtilizationLabel?.inactive}
          </Box>
          <Typography>Inactive</Typography>
          <Box sx={styles?.footerTypographyBox(theme)}>
            {contractUtilizationLabel?.users}
          </Box>
          <Typography>Users</Typography>
        </Box>
      </Box>
    </>
  );
}

export default ContractUtilization;
