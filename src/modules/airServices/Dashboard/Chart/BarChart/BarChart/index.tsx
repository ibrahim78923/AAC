import { CustomChart } from '@/components/Chart';
import { barChartData, barChartDataOptions } from './BarChart.data';
import { useTheme } from '@mui/material';

export const BarChart = () => {
  const theme = useTheme();
  return (
    <CustomChart
      options={barChartDataOptions(theme)}
      series={barChartData}
      type="bar"
      height={348}
    />
  );
};
