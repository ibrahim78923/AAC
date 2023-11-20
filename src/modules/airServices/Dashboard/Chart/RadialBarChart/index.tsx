import { CustomChart } from '@/components/Chart';
import { v4 as uuidv4 } from 'uuid';
import {
  radialBarChartData,
  radialBarChartDataOptions,
} from './RadialBarChart.data';
import { useTheme } from '@mui/material';

export const RadialBarChart = () => {
  const theme = useTheme();

  return (
    <CustomChart
      key={uuidv4()}
      options={radialBarChartDataOptions(theme)}
      series={radialBarChartData}
      type="radialBar"
      height={393}
    />
  );
};
