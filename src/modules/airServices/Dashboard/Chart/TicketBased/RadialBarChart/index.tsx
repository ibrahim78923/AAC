import { CustomChart } from '@/components/Chart';
import { radialBarChartDataOptions } from './RadialBarChart.data';
import { useTheme } from '@mui/material';

export const RadialBarChart = (props: any) => {
  const { chartData } = props;
  const theme = useTheme();
  const lowData: number[] = [];
  const mediumData: number[] = [];
  const highData: number[] = [];
  const urgentData: number[] = [];

  chartData?.pirorityStats?.forEach((ele: any) => {
    switch (ele?.pirority) {
      case 'LOW':
        lowData?.push(ele?.count);
        break;
      case 'URGENT':
        urgentData?.push(ele?.count);
        break;
      case 'MEDIUM':
        mediumData?.push(ele?.count);
        break;
      case 'HIGH':
        highData?.push(ele?.count);
        break;
      default:
        break;
    }
  });
  const radialBarChartData = [lowData, mediumData, highData, urgentData];

  return (
    <CustomChart
      options={radialBarChartDataOptions(theme)}
      series={radialBarChartData}
      type="radialBar"
      height={393}
    />
  );
};
