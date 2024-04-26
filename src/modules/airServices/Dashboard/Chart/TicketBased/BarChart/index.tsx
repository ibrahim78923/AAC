import { CustomChart } from '@/components/Chart';
import { useBarChart } from './useBarChart';

export const BarChart = ({ chartData }: any) => {
  const { options, seriesData } = useBarChart({ chartData });

  return (
    <CustomChart
      options={options}
      series={seriesData}
      type={'bar'}
      height={348}
    />
  );
};
