import { CustomChart } from '@/components/Chart';
import { v4 as uuidv4 } from 'uuid';
import BarChartData from './BarChart.data';
import { BarChartDataOptions } from './BarChart.interface';

export const BarChart = () => {
  return (
    <CustomChart
      key={uuidv4()}
      options={BarChartDataOptions}
      series={BarChartData}
      type="bar"
      height={250}
    />
  );
};
