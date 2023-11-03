import { CustomChart } from '@/components/Chart';
import { v4 as uuidv4 } from 'uuid';
import { barChartData, barChartDataOptions } from './BarChart.data';

export const BarChart = () => {
  return (
    <CustomChart
      key={uuidv4()}
      options={barChartDataOptions}
      series={barChartData}
      type="bar"
      height={280}
    />
  );
};
