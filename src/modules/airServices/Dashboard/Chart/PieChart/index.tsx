import { CustomChart } from '@/components/Chart';
import { v4 as uuidv4 } from 'uuid';
import { pieChartData, pieChartDataOptions } from './PieChart.data';

export const PieChart = () => {
  return (
    <CustomChart
      key={uuidv4()}
      options={{ ...pieChartDataOptions, legend: { show: false } }}
      series={pieChartData?.data}
      type="pie"
      height={180}
    />
  );
};
