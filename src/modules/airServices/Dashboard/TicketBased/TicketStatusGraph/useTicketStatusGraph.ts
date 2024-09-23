import { MONTH_NAMES } from '@/constants/strings';
import { useTheme } from '@mui/material';

export const useTicketStatusGraph = ({ chartData }: any) => {
  const theme = useTheme();

  const groupedData = chartData?.statusStats?.reduce((acc: any, curr: any) => {
    const { month, status, count } = curr;
    acc[month] = acc[month] || { RESOLVED: 0, CLOSED: 0, OPEN: 0, PENDING: 0 };
    acc[month][status] = count;
    return acc;
  }, {});

  const months = Object?.keys(groupedData || {})?.sort(
    (a: any, b: any) => a - b,
  );
  const seriesData = ['RESOLVED', 'CLOSED', 'OPEN', 'PENDING']?.map(
    (status) => ({
      name: status,
      data: months?.map((month) => groupedData[month]?.[status] || 0),
    }),
  );

  const options = {
    xaxis: {
      categories: months?.map((month) => MONTH_NAMES[parseInt(month) - 1]),
    },
    colors: [
      theme?.palette?.custom?.bright,
      theme?.palette?.error?.main,
      theme?.palette?.warning?.main,
      theme?.palette?.success?.main,
    ],
    plotOptions: {
      bar: {
        columnWidth: '30%',
        borderRadius: 2,
      },
    },
    legend: {
      offsetY: 5,
    },
  };

  return { options, seriesData };
};
