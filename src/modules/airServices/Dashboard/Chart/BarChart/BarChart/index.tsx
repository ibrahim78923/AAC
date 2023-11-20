import { CustomChart } from '@/components/Chart';
import { v4 as uuidv4 } from 'uuid';
import { barChartData, barChartDataOptions } from './BarChart.data';
import { useTheme } from '@mui/material';

export const BarChart = () => {
  const theme = useTheme();
  return (
    <CustomChart
      key={uuidv4()}
      options={barChartDataOptions(theme)}
      series={barChartData}
      type="bar"
      height={348}
    />
  );
};
