import { CustomChart } from '@/components/Chart';
import { barChartDataOptions } from './BarChart.data';
import { useTheme } from '@mui/material';
import { useGetTicketsStatusGraphQuery } from '@/services/airServices/dashboard';

export const BarChart = () => {
  const theme = useTheme();
  const { data } = useGetTicketsStatusGraphQuery(true);
  let resolvedData: number[] = [];
  let closedData: number[] = [];
  let openData: number[] = [];
  let pendingData: number[] = [];
  data?.statusStats?.forEach((ele: any) => {
    switch (ele?.status) {
      case 'RESOLVED':
        resolvedData?.push(ele?.count);
        break;
      case 'CLOSED':
        closedData?.push(ele?.count);
        break;
      case 'OPEN':
        openData?.push(ele?.count);
        break;
      case 'PENDING':
        pendingData?.push(ele?.count);
      default:
        break;
    }
  });

  const barChartData = [
    {
      data: pendingData,
      name: 'Pending',
    },
    {
      data: closedData,
      name: 'Closed',
    },
    {
      data: openData,
      name: 'Open',
    },
    {
      data: resolvedData,
      name: 'Resolved',
    },
  ];

  return (
    <CustomChart
      options={barChartDataOptions(theme)}
      series={barChartData}
      type="bar"
      height={348}
    />
  );
};
