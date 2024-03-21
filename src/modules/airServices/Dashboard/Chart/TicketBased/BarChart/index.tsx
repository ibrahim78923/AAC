import { useBarChart } from './useBarChart';
import { CustomChart } from '@/components/Chart';
import { barChartDataOptions } from './BarChart.data';

export const BarChart = (props: any) => {
  const { theme, barChartData } = useBarChart(props);

  return (
    <CustomChart
      options={barChartDataOptions(theme)}
      series={barChartData()}
      type="bar"
      height={348}
    />
  );
};
