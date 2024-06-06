import { useTheme } from '@mui/material';
import { barChartData } from './BarChart.data';

export const useBarChart = () => {
  const theme = useTheme();

  const groupedData = barChartData?.reduce((acc: any, curr: any) => {
    const { month, status, count } = curr;
    acc[month] = acc[month] || {
      Series_1: 0,
      Series_2: 0,
    };
    acc[month][status] = count;
    return acc;
  }, {});

  const monthAbbreviations = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  const months = Object?.keys(groupedData || {})?.sort(
    (a: any, b: any) => a - b,
  );
  const seriesData = ['Series-1', 'Series-2']?.map((status) => ({
    name: status,
    data: months?.map((month: any) => groupedData[month]?.[status] || 0),
  }));

  const options = {
    xaxis: {
      categories: months?.map(
        (month: any) => monthAbbreviations[parseInt(month) - 1],
      ),
    },
    colors: [theme?.palette?.primary?.main, theme?.palette?.blue?.link_blue],
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    legend: {
      offsetY: 5,
    },
  };

  return { options, seriesData };
};
