import { CustomChart } from '@/components/Chart';
import { v4 as uuidv4 } from 'uuid';
import RadialBarChartData from './RadialBarChart.data';
import { RadialBarChartDataOptions } from './RadialBarChart.interface';

export const RadialBarChart = () => {
  return (
    <CustomChart
      key={uuidv4()}
      options={RadialBarChartDataOptions}
      series={RadialBarChartData}
      type="radialBar"
      height={280}
    />
  );
};
