import { CustomChart } from '@/components/Chart';
import { useBarChart } from './useBarChart';

export const BarChart = () => {
  const { options, seriesData } = useBarChart();

  return (
    <>
      <CustomChart
        options={options}
        series={seriesData}
        type={'bar'}
        height={348}
      />
    </>
  );
};
