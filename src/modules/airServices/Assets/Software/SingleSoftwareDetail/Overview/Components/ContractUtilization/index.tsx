import { useDrawingArea } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';
import { StyledText, styles } from './ContractUtilization.style';
import {
  contractUtilizationData,
  contractUtilizationLable,
} from '../../Overview.data';
import { Box, Typography, useTheme } from '@mui/material';

function TextLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText
      x={left + width / styles.alignGraph.textLabelX}
      y={top + height / styles.alignGraph.textLabelY}
    >
      {children}
    </StyledText>
  );
}

function NumberLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText
      x={left + width / styles.alignGraph.numberLabelX}
      y={top + height / styles.alignGraph.numberLabelY}
    >
      {children}
    </StyledText>
  );
}

const size = {
  width: 370,
  height: 280,
};

function ContractUtilization() {
  const theme: any = useTheme();
  return (
    <>
      <Box sx={styles.mainBox(theme)}>
        <Typography sx={styles.heading}>
          {contractUtilizationLable.heading}
        </Typography>
        <PieChart
          series={[
            {
              data: contractUtilizationData,
              cx: styles.alignGraph.cx,
              cy: styles.alignGraph.cy,
              innerRadius: styles.alignGraph.innerRadius,
              outerRadius: styles.alignGraph.outerRadius,
              paddingAngle: styles.alignGraph.paddingAngle,
              cornerRadius: styles.alignGraph.cornerRadius,
              startAngle: styles.alignGraph.startAngle,
              endAngle: styles.alignGraph.endAngle,
            },
          ]}
          sx={styles.chart}
          legend={{ hidden: true }}
          {...size}
        >
          <NumberLabel>{contractUtilizationLable.numLabel}</NumberLabel>
          <TextLabel>{contractUtilizationLable.textLabel} </TextLabel>
        </PieChart>
        <Box sx={styles.footerBox}>
          <Typography sx={styles.footerTypography}>
            <Box sx={styles.footerTypographyBox(theme)}>
              {contractUtilizationLable.inactive}
            </Box>
            Inactive
          </Typography>
          <Typography sx={styles.footerTypography}>
            <Box sx={styles.footerTypographyBox(theme)}>
              {contractUtilizationLable.users}
            </Box>
            Users
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default ContractUtilization;
