import { CustomChart } from '@/components/Chart';
import { radialBarChartDataOptions } from './RadialBarChart.data';
import { useTheme } from '@mui/material';
import { useGetTicketsPriorityGraphQuery } from '@/services/airServices/dashboard';

export const RadialBarChart = () => {
  const theme = useTheme();
  const { data } = useGetTicketsPriorityGraphQuery(true);
  let lowData: number[] = [];
  let mediumData: number[] = [];
  let highData: number[] = [];
  let urgentData: number[] = [];

  data?.pirorityStats?.forEach((ele: any) => {
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
  const radialBarChartData = [lowData, mediumData,highData,urgentData];

  return (
    <CustomChart
      options={radialBarChartDataOptions(theme)}
      series={radialBarChartData}
      type="radialBar"
      height={393}
    />
  );
};
