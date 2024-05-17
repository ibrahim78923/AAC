import { useTheme } from '@mui/material';
import { chartData } from '../TicketsReport.data';

export const useTicketsReportChart = () => {
  const theme = useTheme();

  const groupedData = chartData?.reduce((acc: any, curr: any) => {
    const { month, status, count } = curr;
    acc[month] = acc[month] || {
      New_Tickets: 0,
      Resolved_Tickets: 0,
      OverDue_Tickets: 0,
      Pending_Tickets: 0,
      Close_Tickets: 0,
      unassigned_Tickets: 0,
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
  const seriesData = [
    'New Tickets',
    'Resolved Tickets',
    'OverDue Tickets',
    'Pending Tickets',
    'Close Tickets',
    'Unassigned Tickets',
  ]?.map((status) => ({
    name: status,
    data: months?.map((month: any) => groupedData[month]?.[status] || 0),
  }));

  const options = {
    xaxis: {
      categories: months?.map(
        (month: any) => monthAbbreviations[parseInt(month) - 1],
      ),
    },
    colors: [
      theme?.palette?.primary?.main,
      theme?.palette?.blue?.link_blue,
      theme?.palette?.error?.main,
      theme?.palette?.warning?.main,
      theme?.palette?.custom?.lime_green,
      theme?.palette?.info?.dark,
    ],
    plotOptions: {
      bar: {
        columnWidth: '60%',
      },
    },
    legend: {
      offsetY: 5,
    },
  };

  return { options, seriesData };
};
