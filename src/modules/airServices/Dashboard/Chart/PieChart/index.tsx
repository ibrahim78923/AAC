import { CustomChart } from '@/components/Chart';
import { v4 as uuidv4 } from 'uuid';
import { PieChartData } from './PieChart.data';
import { PieChartDataOptions } from './PieChart.interface';

export const PieChart = () => {
  return (
    <CustomChart
      key={uuidv4()}
      options={{ ...PieChartDataOptions, legend: { position: 'top' } }}
      series={PieChartData?.data}
      type="pie"
      height={205}
    />
  );
};
