import { CustomChart } from '@/components/Chart';
import { pieChartData, pieChartDataOptions } from './PieChart.data';
import { useTheme } from '@mui/material';

export const PieChart = () => {
  const theme = useTheme();
  return (
    <CustomChart
      options={{ ...pieChartDataOptions(theme), legend: { show: false } }}
      series={pieChartData?.data}
      type="pie"
      height={212}
    />
  );
};
