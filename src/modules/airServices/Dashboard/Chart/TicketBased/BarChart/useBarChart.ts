import { useTheme } from '@mui/material';

export const useBarChart = (props: any) => {
  const { chartData } = props;
  const theme = useTheme();
  const resolvedData: number[] = [];
  const closedData: number[] = [];
  const openData: number[] = [];
  const pendingData: number[] = [];
  chartData?.statusStats?.forEach((ele: any) => {
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

  const barChartData = () => [
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
  return {
    theme,
    barChartData,
  };
};
