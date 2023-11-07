import { CustomChart } from '@/components/Chart';
import { v4 as uuidv4 } from 'uuid';
import { pieChartData, pieChartDataOptions } from './PieChart.data';
import { useTheme } from '@mui/material';

export const PieChart = () => {
  const theme = useTheme();
  return (
    <CustomChart
      key={uuidv4()}
      options={{ ...pieChartDataOptions(theme), legend: { show: false } }}
      series={pieChartData?.data}
      type="pie"
      height={181}
    />
  );
};
