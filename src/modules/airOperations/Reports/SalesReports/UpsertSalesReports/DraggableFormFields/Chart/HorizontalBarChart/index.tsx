import { CustomChart } from '@/components/Chart';
import { useHorizontalBarChart } from './useHorizontalBarChart';
import { horizontalBarChartData as chartSeries } from './HorizontalBarChart.data';

export const HorizontalBarChart = () => {
  const { chartOptions } = useHorizontalBarChart();

  return (
    <CustomChart
      options={chartOptions as any}
      series={chartSeries}
      type={'bar'}
      height={348}
    />
  );
};
