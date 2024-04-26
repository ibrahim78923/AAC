import { CustomChart } from '@/components/Chart';
import useRadialBarChart from './useRadialBarChart';

export const RadialBarChart = ({ chartData }: any) => {
  const { options, radialBarChartData } = useRadialBarChart({ chartData });

  return (
    <CustomChart
      options={options}
      series={radialBarChartData}
      type={'radialBar'}
      height={348}
    />
  );
};
