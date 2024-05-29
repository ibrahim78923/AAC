import { Box, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import PieChartIcon from '@mui/icons-material/PieChart';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useChart } from './useChart';
import { BarChart } from './BarChart';
import { DonutChart } from './DonutChart';
import { PaiChart } from './PieChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { CHARTS } from '@/constants/strings';

export const Chart = (props: any) => {
  const {
    theme,
    chartType,
    toggleIconBox,
    isIconBoxVisible,
    handleChartSelection,
  } = useChart(props);

  return (
    <Box
      border={`1px solid ${theme?.palette?.grey[700]}`}
      p={1}
      borderRadius={2}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={'center'}
        mb={2}
        p={1}
      >
        <Typography color="secondary" variant="h5">
          {chartType}
        </Typography>
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={1}
          sx={{ cursor: 'pointer' }}
        >
          <DeleteIcon color="secondary" />
          <ContentCopyIcon color="secondary" />
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={1}
            border={1}
            borderColor={isIconBoxVisible ? 'primary.main' : 'secondary.main'}
            p={0.1}
            borderRadius={1}
          >
            <DashboardIcon
              onClick={toggleIconBox}
              color={isIconBoxVisible ? 'primary' : 'secondary'}
            />
            {isIconBoxVisible && (
              <>
                <BarChartIcon
                  color={
                    chartType === CHARTS?.BAR_CHART ? 'primary' : 'secondary'
                  }
                  onClick={() =>
                    handleChartSelection(
                      <BarChart />,
                      CHARTS?.BAR_CHART,
                      chartType,
                    )
                  }
                />
                <DonutLargeIcon
                  color={
                    chartType === CHARTS?.DONUT_CHART ? 'primary' : 'secondary'
                  }
                  onClick={() =>
                    handleChartSelection(
                      <DonutChart />,
                      CHARTS?.DONUT_CHART,
                      chartType,
                    )
                  }
                />
                <PieChartIcon
                  color={
                    chartType === CHARTS?.PIE_CHART ? 'primary' : 'secondary'
                  }
                  onClick={() =>
                    handleChartSelection(
                      <PaiChart />,
                      CHARTS?.PIE_CHART,
                      chartType,
                    )
                  }
                />
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box></Box>
      {chartType === CHARTS?.BAR_CHART && <BarChart />}
      {chartType === CHARTS?.DONUT_CHART && <DonutChart />}
      {chartType === CHARTS?.PIE_CHART && <PaiChart />}
    </Box>
  );
};
