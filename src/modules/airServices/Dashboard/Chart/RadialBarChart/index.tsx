import { CustomChart } from '@/components/Chart';
import { v4 as uuidv4 } from 'uuid';
import {
  radialBarChartData,
  radialBarChartDataOptions,
} from './RadialBarChart.data';

export const RadialBarChart = () => {
  return (
    <CustomChart
      key={uuidv4()}
      options={radialBarChartDataOptions}
      series={radialBarChartData}
      type="radialBar"
      height={280}
    />
  );
};
