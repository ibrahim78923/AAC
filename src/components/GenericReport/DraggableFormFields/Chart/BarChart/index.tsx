import { CustomChart } from '@/components/Chart';
import { useBarChart } from './useBarChart';
import { barChartData as chartSeries } from './BarChart.data';

export const BarChart = () => {
  const { chartOptions } = useBarChart();

  return (
    <CustomChart
      options={chartOptions as any}
      series={chartSeries}
      type={'bar'}
      height={348}
    />
  );
};
