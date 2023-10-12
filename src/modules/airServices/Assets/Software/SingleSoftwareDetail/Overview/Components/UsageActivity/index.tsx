import { useDrawingArea } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';
import { StyledText, styles } from './UsageActivity.style';
import { UsageActivityLable, UsageActivityData } from '../../Overview.data';
import { Box, Typography, useTheme } from '@mui/material';

function TextLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 1.4} y={top + height / 1.9}>
      {children}
    </StyledText>
  );
}

function NumberLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 1.4} y={top + height / 2.2}>
      {children}
    </StyledText>
  );
}

function UsageActivity() {
  const theme: any = useTheme();
  return (
    <>
      <Box sx={styles.mainBox(theme)}>
        <Typography sx={styles.heading}>
          {UsageActivityLable.heading}
        </Typography>
        <PieChart
          series={[
            {
              data: UsageActivityData,
              cx: 140,
              cy: 110,
              innerRadius: 55,
              outerRadius: 85,
              paddingAngle: 5,
              cornerRadius: 15,
              startAngle: -250,
              endAngle: 300,
            },
          ]}
          height={220}
          legend={{ hidden: true }}
        >
          <NumberLabel>{UsageActivityLable.numLabel}</NumberLabel>
          <TextLabel>{UsageActivityLable.textLabel} </TextLabel>
        </PieChart>
        <Box sx={styles.footerBox}>
          <Typography sx={styles.footerTypography}>
            <Box sx={styles.footerTypographyBox(theme)}>
              {UsageActivityLable.inactive}
            </Box>
            Inactive
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default UsageActivity;
