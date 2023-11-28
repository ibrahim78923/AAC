import { CustomChart } from '@/components/Chart';
import {
  radialBarChartData,
  radialBarChartDataOptions,
} from './RadialBarChart.data';
import { useTheme } from '@mui/material';

export const RadialBarChart = () => {
  const theme = useTheme();

  return (
    <CustomChart
      options={radialBarChartDataOptions(theme)}
      series={radialBarChartData}
      type="radialBar"
      height={393}
    />
  );
};
